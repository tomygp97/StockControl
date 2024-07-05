const mongoose = require('mongoose');

// Models
const Product = require('../models/productModel');
const Variant = require('../models/variantModel');
const Sale = require('../models/saleModel');

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
            // Iniciamos una transacción
            session = await mongoose.startSession();
            session.startTransaction();

            const productsSoldWithDetails = [];

            for (const productSold of productsSold) {
                const { product, variant, quantitySold } = productSold;

                const productData = await Product.findById(product);

                const totalPrice = productData.price * quantitySold;

                await updateStockOnSale(product, variant, quantitySold, session);
                await updateAvailability(variant, session);

                productsSoldWithDetails.push({
                    product,
                    variant,
                    quantitySold,
                    totalPrice,
                });
            }

                const newSale = new Sale({
                    productsSold: productsSoldWithDetails,
                    customer,
                    paymentDetails,
                    bill: bill || false,
                    status: 'Pendiente',
                    date: new Date(),
                });

                await newSale.save({ session });            
    
            // Confirmamos la transacción
            await session.commitTransaction();

            return newSale;
        } catch (error) {
            console.log("Error en createSale: ",error);
            // Si algo sale mal, revierte los cambios
            if (session) {
                await session.abortTransaction();
            }

            throw error;
        } finally {
            // Cerramos la sesión
            if(session) session.endSession();
        }
    }
}

module.exports = saleService;