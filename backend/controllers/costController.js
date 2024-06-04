const Cost = require('../models/costModel');
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');

const getAllCosts = async (req, res) => {
    try {
        const costs = await Cost.find({});
        res.status(StatusCodes.OK).json({ costs });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    };
};

const getCostById = async (req, res) => {
    try {
        const cost = await Cost.findById(req.params.id);
        if (!cost) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Costo no encontrado' });
        };
        res.status(StatusCodes.OK).json({ cost });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
}

const createCost = async(req, res) => {
    try {
        const productId = req.body.productId;
        // Verificamos si el producto existe
        //TODO hacerlo con middleware de validacion
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
        };

        const amount = req.body.unitCost * req.body.unitsOrdered;

        const newCost = new Cost({
            product: productId,
            ...req.body,
            amount
        });
        await newCost.save();
        res.status(StatusCodes.CREATED).json({ newCost });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
}

const updateCost = async(req, res) => {
    try {
        const costId = req.params.id;
        const cost = await Cost.findById(costId);
        if (!cost) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Costo no encontrado' });
        };

        const newUnitCost = req.body.unitCost !== undefined ? req.body.unitCost : cost.unitCost;
        const newUnitsOrdered = req.body.unitsOrdered !== undefined ? req.body.unitsOrdered : cost.unitsOrdered;
        const newAmount = newUnitCost * newUnitsOrdered;

        const updatedCost = await Cost.findByIdAndUpdate(costId, {
            ...req.body,
            amount: newAmount,
        }, { new: true });

        res.status(StatusCodes.OK).json({ updatedCost });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const deleteCost = async(req, res) => {
    try {
        const deletedCost = await Cost.findByIdAndDelete(req.params.id);
        if (!deletedCost) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Costo no encontrado' });
        };
        res.status(StatusCodes.OK).json({ deletedCost });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
}


module.exports = {
    getAllCosts,
    getCostById,
    createCost,
    updateCost,
    deleteCost,
};