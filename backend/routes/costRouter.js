const express = require('express');
const router = express.Router();

const {
    getAllCosts,
    getCostById,
    createCost,
    updateCost,
    deleteCost,
} = require('../controllers/costController');

//! Verificar validaciones
const { validateCost } = require('../middleware/validationMiddleware');

router.route('/').get(getAllCosts).post(createCost);
router.route('/:id').get(getCostById).put(updateCost).delete(deleteCost);

module.exports = router;