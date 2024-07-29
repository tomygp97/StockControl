const mongoose = require('mongoose');

// Models
const Product = require('../models/productModel');
const Variant = require('../models/variantModel');
const Sale = require('../models/saleModel');
const Customer = require('../models/customerModel');

// Helpers
const updateStockOnSale = require('../helpers/updateStockOnSale');
const updateAvailability = require('../helpers/updateAvailability');

const saleService = {
    createSale: async (saleData) => {
        let session;
    
        try {
            const { productsSold, customer, paymentDetails, bill } = saleData;
    
            // Verificar que productsSold no sea nulo o vacío
            if (!productsSold || !Array.isArray(productsSold) || productsSold.length === 0) {
                throw new Error("productsSold no es válido");
            }
    
            const customerExists = await Customer.findById(customer);
            if (!customerExists) {
                throw new Error("Cliente no encontrado en saleService");
            }
    
            // Iniciamos una transacción
            session = await mongoose.startSession();
            session.startTransaction();
    
            const productsSoldWithDetails = [];
            let errors = [];
            let totalPrice = 0;
    
            for (const productSold of productsSold) {
                const { product, variants } = productSold;
    
                const productData = await Product.findById(product).session(session);
    
                let productTotalPrice = 0;
                let productTotalQuantitySold = 0;
    
                for (const variantSold of variants) {
                    const { variant, quantitySold } = variantSold;
    
                    // Eliminamos la declaración de variantData ya que no se utiliza
                    // const variantData = await Variant.findById(variant).session(session);
    
                    productTotalPrice += productData.price * quantitySold;
                    productTotalQuantitySold += quantitySold;
    
                    try {
                        await updateStockOnSale(product, variant, quantitySold, session, 0); // OriginalQuantitySold = 0 ya que es una nueva venta
                    } catch (error) {
                        errors.push(error.message);
                    }
    
                    await updateAvailability(variant, session);
                }
    
                productsSoldWithDetails.push({
                    product,
                    variants,
                    totalProductPrice: productTotalPrice,
                    totalQuantitySold: productTotalQuantitySold,
                });
    
                totalPrice += productTotalPrice;
            }
    
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }
    
            const newSale = new Sale({
                productsSold: productsSoldWithDetails,
                customer: customerExists._id,
                paymentDetails,
                bill: bill || false,
                status: 'Pendiente',
                totalPrice,
                date: new Date(),
            });
    
            await newSale.save({ session });
    
            // Confirmamos la transacción
            await session.commitTransaction();
    
            return newSale;
        } catch (error) {
            console.log("Error en createSale: ", error);
            // Si algo sale mal, revierte los cambios
            if (session) {
                await session.abortTransaction();
            }
    
            throw error;
        } finally {
            // Cerramos la sesión
            if (session) session.endSession();
        }
    },    

    updateSale: async (saleId, updateData) => {
        let session;
    
        try {
            // Iniciamos una transacción
            session = await mongoose.startSession();
            session.startTransaction();
    
            const sale = await Sale.findById(saleId).session(session);
            if (!sale) {
                throw new Error("Venta no encontrada");
            }
    
            const originalProductsSold = sale.productsSold;
            const { productsSold = originalProductsSold, ...restUpdateData } = updateData;
    
            let errors = [];
            let updatedProductsSold = [];
    
            // Primero, manejamos la eliminación de productos o variantes
            for (const original of originalProductsSold) {
                const updated = productsSold.find(p => p.product.toString() === original.product.toString() && p.variant.toString() === original.variant.toString());
                
                // Si el producto/variante ya no está en la lista actualizada, devolver stock
                if (!updated) {
                    const { product, variant, quantitySold } = original;
                    try {
                        // Reponer stock de productos eliminados
                        await updateStockOnSale(product, variant, 0, session, quantitySold);
                    } catch (error) {
                        errors.push(error.message);
                    }
                } else {
                    // Si hay un cambio en la cantidad, actualiza el stock
                    const originalQuantity = original.quantitySold;
                    const newQuantity = updated.quantitySold;
    
                    if (originalQuantity !== newQuantity) {
                        try {
                            await updateStockOnSale(original.product, original.variant, newQuantity, session, originalQuantity);
                        } catch (error) {
                            errors.push(error.message);
                        }
                    }
    
                    // Agregamos los productos actualizados
                    updatedProductsSold.push({
                        product: original.product,
                        variant: original.variant,
                        quantitySold: newQuantity,
                        totalPrice: original.totalPrice // Mantiene el precio original
                    });
                }
            }
    
            // Añadir nuevos productos vendidos
            for (const productSold of productsSold) {
                // Verifica si el producto ya estaba en la venta original
                // Si no está, calcula totalPrice y actualiza el stock
                if (!originalProductsSold.some(p => p.product.toString() === productSold.product.toString() && p.variant.toString() === productSold.variant.toString())) {
                    const { product, variant, quantitySold } = productSold;
                    const productData = await Product.findById(product).session(session);
    
                    const totalPrice = productData.price * quantitySold;
    
                    try {
                        // Actualizar stock para nuevos productos
                        await updateStockOnSale(product, variant, quantitySold, session, 0);
    
                        // Añadir al detalle de productos vendidos
                        updatedProductsSold.push({
                            product,
                            variant,
                            quantitySold,
                            totalPrice
                        });
                    } catch (error) {
                        errors.push(error.message);
                    }
                }
            }
    
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }
    
            // Actualizar datos de la venta
            const updatedSale = await Sale.findByIdAndUpdate(
                saleId,
                { ...restUpdateData, productsSold: updatedProductsSold }, // Solo actualiza los campos proporcionados
                { new: true }
            ).session(session);
    
            // Confirmamos la transacción
            await session.commitTransaction();
    
            return updatedSale;
        } catch (error) {
            console.log("Error en updateSale: ", error);
            // Si algo sale mal, revierte los cambios
            if (session) {
                await session.abortTransaction();
            }
    
            throw error;
        } finally {
            // Cerramos la sesión
            if (session) session.endSession();
        }
    }

}

module.exports = saleService;