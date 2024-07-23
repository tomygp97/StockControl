const Product = require('../models/productModel');
const Variant = require('../models/variantModel');

const updateStockOnSale = async (productId, variantId, quantitySold, session) => {
    const variant = await Variant.findById(variantId).session(session);

    // Actualiza la cantidad en stock de la variante
    variant.quantity -= quantitySold;
    if (variant.quantity < 0) {
        throw new Error('No hay suficiente stock');
    }
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
