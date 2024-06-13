const Product = require('../models/productModel');
const Variant = require('../models/variantModel');

const updateAvailability = require('./updateAvailability');

const adjustStockOnVariantUpdate = async (productId, quantityDifference) => {
    try {
        const product = await Product.findById(productId).populate('variants');

        // Suma las cantidades de todas las variantes
        let totalVariantQuantity = product.variants.reduce((total, variant) => {
            return total + variant.quantity;
        }, 0);

        // Actualiza el stock del producto con la suma de las cantidades de las variantes
        product.quantityInStock = totalVariantQuantity;
        await product.save();

        // Actualiza la disponibilidad de todas las variantes
        for (let variant of product.variants) {
            await updateAvailability(variant._id);
        };
    } catch (error) {
        throw new Error(`Error al ajustar el stock: ${error.message}`);
    }
};


module.exports = adjustStockOnVariantUpdate;
