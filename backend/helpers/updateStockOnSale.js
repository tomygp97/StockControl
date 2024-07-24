const Product = require('../models/productModel');
const Variant = require('../models/variantModel');

const updateStockOnSale = async (productId, variantId, newQuantitySold, session, originalQuantitySold = 0) => {
    const variant = await Variant.findById(variantId).session(session);

    const quantityDifference = newQuantitySold - originalQuantitySold;

    // Verificar si hay suficiente stock
    if (variant.quantity < quantityDifference) {
        throw new Error(`No hay suficiente stock para la variante ${variantId} del producto ${productId}`);
    }

    // Actualiza la cantidad en stock de la variante
    variant.quantity -= quantityDifference;
    await variant.save({ session });

    const product = await Product.findById(productId).session(session);
    if (!product) {
        throw new Error('Producto no encontrado');
    }
    
    const variants = await Variant.find({ _id: { $in: product.variants } }).session(session);

    // Recalcula la cantidad en stock del producto sumando las cantidades de todas las variantes
    product.quantityInStock = variants.reduce((total, variant) => total + variant.quantity, 0);
    if (product.quantityInStock < 0) {
        throw new Error('No hay suficiente stock');
    }

    await product.save({ session });
};

module.exports = updateStockOnSale;
