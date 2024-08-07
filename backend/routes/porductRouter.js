const express = require('express');
const router = express.Router();

const variantRouter = require('./variantRouter');

const { 
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductWithVariants,
} = require('../controllers/productController');

const { validateProduct, validateProductUpdate, validateProductIdParam, validateVariant, } = require('../middleware/validationMiddleware');

router.use('/:id/variants', variantRouter);

router.route('/')
    .get(getAllProducts)
    // .post(validateProduct, createProduct);
    .post(validateProduct, createProductWithVariants);
    
router.route('/:id')
    .get(validateProductIdParam, getProductById)
    .put(validateProductIdParam, validateProductUpdate, updateProduct)
    .delete(validateProductIdParam, deleteProduct);

module.exports = router;