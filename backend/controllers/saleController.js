const Sale = require('../models/saleModel');
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');

// Helpers
const updateStockOnSale = require('../helpers/updateStockOnSale');
// Services
const saleService = require('../services/saleServices');

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
        const sale = await Sale.findById(req.params.id).populate('product variant');
        res.status(StatusCodes.OK).json({ sale });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const createSale = async(req, res) => {
    try {
        const saleData = {
            ...req.body,
            variant: req.variant,
            product: req.product
        }
        const newSale = await saleService.createSale(saleData);
        res.status(StatusCodes.CREATED).json({ newSale });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    };
};

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