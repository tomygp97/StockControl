const Sale = require('../models/saleModel');
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');
const updateStock = require('../helpers/updateStock');

const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find({});
        res.status(StatusCodes.OK).json({  sales  });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}
const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);
        res.status(StatusCodes.OK).json({ sale });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const createSale = async (req, res) => {
    try {
        const { productId, variantId, customer, quantitySold, paymentDetails, bill } = req.body;

        // Buscamos el producto
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
        };

        // Verificamos que la variante pertenezca al producto
        const variantExists = product.variants.some(id => id.toString() === variantId);
        if (!variantExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Variante no encontrada o no pertenece al producto' });
        }

        // Calculamos el precio total de la venta
        const totalPrice = product.price * quantitySold;

        // Creamos la nueva venta 
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

        // Actualizamos el stock
        await updateStock(productId, variantId, quantitySold);

        // Guardamos la venta
        await newSale.save();
        
        res.status(StatusCodes.CREATED).json({ newSale });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
}

const updateSale = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const deleteSale = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
};