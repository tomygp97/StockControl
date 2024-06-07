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

//! Verificar validaciones
const { validateProduct, validateVariant } = require('../middleware/validationMiddleware');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

router.route('/:id/variants').get(getAllVariants).post(createVariant);
router.route('/:id/variants/:variantId').get(getVariantById).put(updateVariant).delete(deleteVariant);

module.exports = router;