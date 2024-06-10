const Product = require('../models/productModel');

const increaseStockOnNewVariant = async (productId, variantQuantity) => {
    const product = await Product.findById(productId);

    product.quantityInStock += variantQuantity;
    await product.save();
};

module.exports = increaseStockOnNewVariant;