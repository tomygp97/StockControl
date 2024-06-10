const express = require('express');
const router = express.Router();

const {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
} = require('../controllers/saleController');

//! Verificar validaciones
const { validateSale, validateSaleIdParam } = require('../middleware/validationMiddleware');

router.route('/').get(getAllSales).post(validateSale, createSale);
router.route('/:id').get(validateSaleIdParam, getSaleById).put(validateSaleIdParam, validateSale, updateSale).delete(validateSaleIdParam, deleteSale);

module.exports = router;