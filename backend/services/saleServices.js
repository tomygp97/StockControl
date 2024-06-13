const mongoose = require('mongoose');

// Models
const Product = require('../models/productModel');
const Variant = require('../models/variantModel');
const Sale = require('../models/saleModel');

// Helpers
const { updateStockOnSale } = require('../helpers/updateStockOnSale');
const { updateAvailability } = require('../helpers/updateAvailability');

const saleService = {
    createSale: async (saleData) => {
        try {
            // Iniciamos una transacción
            const session = await mongoose.startSession();
            session.startTransaction();
    
            const { productId, variantId, customer, quantitySold, paymentDetails, bill } = saleData;
    
            // Buscamos el producto
            const product = await Product.findById(productId).populate('variants');
    
            const totalPrice = product.price * quantitySold;
    
            await updateStockOnSale(productId, variantId, quantitySold);
            await updateAvailability(variantId);
    
            const newSale = new Sale({
                product: productId,
                variant: variantId,
                customer,
                quantitySold,
                totalPrice,
                paymentDetails,
                bill: bill || false,
                date: new Date(),
            });
            
            await newSale.save();
    
            // Confirmamos la transacción
            await session.commitTransaction();
            session.endSession();
    
            return newSale;
        } catch (error) {
            // Si algo sale mal, revierte los cambios
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }

            throw error;
        }
    }
}

module.exports = saleService;