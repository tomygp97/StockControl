const { mongoose } = require('mongoose');
const { body, param, validationResult  } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const Product = require('../models/productModel');
const Variant = require('../models/variantModel');

const validateVariantExists =  async (req, res, next) => {
    try {
        const { id: productId, variantId } = req.params;

        const product = await Product.findById(productId).populate('variants');
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
        };
    
        const variant = product.variants.find(variant => variant._id.toString() === variantId);
        if (!variant) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Variante no encontrada para este producto' });
        };
        req.product = product;
        req.variant = variant;
        next();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    };
};

const validateSaleProductAndVariant = async (req, res, next) => {
    try {
        const { productsSold } = req.body;

        for (const productSold of productsSold) {
            const { product: productId, variant: variantId } = productSold;

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
            }

            const variant = await Variant.findById(variantId);
            if (!variant) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Variante no encontrada' });
            }
        }

        next();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = {validateVariantExists, validateSaleProductAndVariant};
