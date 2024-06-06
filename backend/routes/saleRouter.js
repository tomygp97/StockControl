const express = require('express');
const router = express.Router();

const {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
} = require('../controllers/saleController');

//TODO: add validation middleware

router.route('/').get(getAllSales).post(createSale);
router.route('/:id').get(getSaleById).put(updateSale).delete(deleteSale);

module.exports = router;