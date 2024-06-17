const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams: true --> Para que el router funcione con el router de porductRouter

const { 
    getAllVariants,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant
} = require('../controllers/variantController');

const { validateVariant, validateVariantUpdate, validateVariantIdParam } = require('../middleware/validationMiddleware');
const { validateVariantExists } = require('../middleware/entityValidationMiddleware');

router.route('/').get(getAllVariants).post(validateVariant, createVariant);
router.route('/:variantId').get(validateVariantExists, getVariantById).put(validateVariantExists, validateVariantUpdate, updateVariant).delete(validateVariantExists, deleteVariant);

module.exports = router;