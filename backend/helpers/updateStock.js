const Product = require('../models/productModel');
const Variant = require('../models/variantModel');

const updateStock = async (productId, variantId, quantitySold) => {
    
    const variant = await Variant.findById(variantId);
    if (!variant) {
        throw new Error('Variante no encontrada');
    };

    // Actualiza la cantidad en stock de la variante
    variant.quantity -= quantitySold;
    if(variant.quantity < 0) {
        throw new Error('No hay suficiente stock');
    };
    await variant.save();

    // Actualiza la cantidad en stock del producto
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Producto no encontrado');
    };
    product.quantityInStock -= quantitySold;
    if(product.quantityInStock < 0) {
        throw new Error('No hay suficiente stock');
    };
    await product.save();
};

module.exports = updateStock;