const express = require('express');
const router = express.Router();

const { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { 
    getAllVariants,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant
} = require('../controllers/variantController');

const { validateProduct, validateProductUpdate, validateVariant, validateProductIdParam } = require('../middleware/validationMiddleware');

router.route('/').get(getAllProducts).post(validateProduct, createProduct);
router.route('/:id').get(validateProductIdParam, getProductById).put(validateProductIdParam, validateProductUpdate, updateProduct).delete(validateProductIdParam, deleteProduct);

router.route('/:id/variants').get(getAllVariants).post(validateVariant, createVariant);
router.route('/:id/variants/:variantId').get(getVariantById).put(validateVariant, updateVariant).delete(deleteVariant);

module.exports = router;