const express = require('express');
const router = express.Router();

const {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customerController');

const { validateCustomer, validateCustomerUpdate, validateCustomerIdParam } = require('../middleware/validationMiddleware');

router.route('/')
    .get(getAllCustomers)
    .post(validateCustomer, createCustomer);
    
router.route('/:id')
    .get(validateCustomerIdParam, getCustomerById)
    .put(validateCustomerIdParam, validateCustomerUpdate, updateCustomer)
    .delete(validateCustomerIdParam, deleteCustomer);

module.exports = router;