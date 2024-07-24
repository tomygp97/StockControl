const Customer = require('../models/customerModel');
const { StatusCodes } = require('http-status-codes');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(StatusCodes.OK).json({ customers });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(StatusCodes.OK).json({ customer });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const createCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer({ ...req.body });
        await newCustomer.save();
        res.status(StatusCodes.CREATED).json({ newCustomer });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(StatusCodes.OK).json({ "Cliente actualizado: ": updatedCustomer });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({ deletedCustomer });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};