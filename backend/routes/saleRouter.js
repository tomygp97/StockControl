const express = require('express');
const router = express.Router();

const {
    getAllSales,
    getSaleById,
    getSalesbyCustomer,
    createSale,
    updateSale,
    deleteSale,
} = require('../controllers/saleController');

//! Verificar validaciones
const { validateSale, validateSaleUpdate, validateSaleIdParam, validateCustomerIdParam } = require('../middleware/validationMiddleware');
const { validateSaleProductAndVariant } = require('../middleware/entityValidationMiddleware');

router.route('/').get(getAllSales).post(validateSale, validateSaleProductAndVariant, createSale);
router.route('/:id')
    .get(validateSaleIdParam, getSaleById)
    .put(validateSaleIdParam, updateSale)
    .delete(validateSaleIdParam, deleteSale);
router.route('/customer/:id').get(validateCustomerIdParam, getSalesbyCustomer);

module.exports = router;