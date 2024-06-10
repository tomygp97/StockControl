const express = require('express');
const router = express.Router();

const variantRouter = require('./variantRouter');

const { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { validateProduct, validateProductUpdate, validateProductIdParam, } = require('../middleware/validationMiddleware');

router.use('/:id/variants', variantRouter);

router.route('/')
    .get(getAllProducts)
    .post(validateProduct, createProduct);
    
router.route('/:id')
    .get(validateProductIdParam, getProductById)
    .put(validateProductIdParam, validateProductUpdate, updateProduct)
    .delete(validateProductIdParam, deleteProduct);

// router.route('/:id/variants').get(getAllVariants).post(validateVariant, createVariant);
// router.route('/:id/variants/:variantId').get(validateVariantExists, getVariantById).put(validateVariantExists, validateVariantUpdate, updateVariant).delete(validateVariantExists, deleteVariant);

module.exports = router;