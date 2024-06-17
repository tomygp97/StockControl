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
        // Iniciamos una transacción
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { product, variant, customer, quantitySold, paymentDetails, bill } = saleData;
    
            // Buscamos el producto //! Ya no es necesario buscar ya que lo envio en saleData
            // const product = await Product.findById(productId).populate('variants');
            
            const totalPrice = product.price * quantitySold;

            await updateStockOnSale(product._id, variant._id, quantitySold, session);
            await updateAvailability(variant._id, session);
    
            const newSale = new Sale({
                product: product._id,
                variant: variant._id,
                customer,
                quantitySold,
                totalPrice,
                paymentDetails,
                bill: bill || false,
                date: new Date(),
            });
            
            await newSale.save({ session });
    
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