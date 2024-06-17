const Product = require('../models/productModel');
const Variant = require('../models/variantModel');

const updateStockOnSale = async (productId, variantId, quantitySold, session) => {
    
    const variant = await Variant.findById(variantId).session(session);

    // Actualiza la cantidad en stock de la variante
    variant.quantity -= quantitySold;
    if(variant.quantity < 0) {
        throw new Error('No hay suficiente stock');
    };
    await variant.save({ session });

    // Actualiza la cantidad en stock del producto
    const product = await Product.findById(productId).session(session);
    if (!product) {
        throw new Error('Producto no encontrado');
    };
    product.quantityInStock -= quantitySold;
    if(product.quantityInStock < 0) {
        throw new Error('No hay suficiente stock');
    };
    await product.save({ session });
};

module.exports = updateStockOnSale;