const { mongoose } = require('mongoose');
const { body, param, validationResult  } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

// Models
const Product = require('../models/productModel');
const Variant = require('../models/variantModel');
const Cost = require('../models/costModel');
const Sale = require('../models/saleModel');

const withValidationErrors = (validateValues) => {
    return [validateValues, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorMessages });
        }
        next();   
    }];
};

//* Product Validations
const validateProduct = withValidationErrors([
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('price').notEmpty().withMessage('El precio es requerido'),
    body('category').notEmpty().withMessage('La categoría es requerida'),
    body('description')
    .optional().if(body('description').exists()).isLength({ min: 5, max: 300 }).withMessage('La descripción debe tener entre 5 y 300 caracteres'),
]);

const validateProductUpdate = withValidationErrors([
    body('name').optional().notEmpty().withMessage('El nombre es requerido'),
    body('price').optional().notEmpty().withMessage('El precio es requerido'),
    body('category').optional().notEmpty().withMessage('La categoría es requerida'),
    body('description').optional()
        .if(body('description').exists()).isLength({ min: 5, max: 300 }).withMessage('La descripción debe tener entre 5 y 300 caracteres'),
]);


//* Variant Validations
const validateVariant = withValidationErrors([
    body('color').notEmpty().withMessage('El color es requerido').isIn(['Azul', 'Beige', 'Negro', 'Rojo', 'Verde']).withMessage('El color debe ser Azul, Beige, Negro, Rojo o Verde'),
    body('size').notEmpty().withMessage('El tamaño es requerido').isIn(['34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54']).withMessage('El talle debe ser un valor entre 34 y 54'),
    body('quantity').notEmpty().withMessage('La cantidad es requerida')
        .isInt({ min: 0 }).withMessage('La cantidad debe ser un número positivo'),
]);

const validateVariantUpdate = withValidationErrors([
    body('color').optional().notEmpty().withMessage('El color es requerido').isIn(['Azul', 'Beige', 'Negro', 'Rojo', 'Verde']).withMessage('El color debe ser Azul, Beige, Negro, Rojo o Verde'),
    body('size').optional().notEmpty().withMessage('El tamaño es requerido').isIn(['34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54']).withMessage('El talle debe ser un valor entre 34 y 54'),
    body('quantity').optional().notEmpty().withMessage('La cantidad es requerida')
        .isInt({ min: 0 }).withMessage('La cantidad debe ser un número positivo'),
]);


//* Cost Validations
const validateCost = withValidationErrors([
    body('product').notEmpty().withMessage('El producto es requerido'),
    body('category').notEmpty().withMessage('La categoría es requerida'),
    body('unitCost').notEmpty().withMessage('El precio unitario es requerido')
        .isFloat({ min: 0 }).withMessage('El precio unitario debe ser un número positivo'),
    body('unitsOrdered').notEmpty().withMessage('La cantidad ordenada es requerida')
        .isFloat({ min: 0 }).withMessage('La cantidad ordenada debe ser un número positivo'),
    body('amount').notEmpty().withMessage('El importe es requerido')
        .isFloat({ min: 0 }).withMessage('El importe debe ser un número positivo'),
    body('description')
        .if(body('description').exists()).isLength({ min: 5, max: 300 }).withMessage('La descripción debe tener entre 5 y 300 caracteres'),
    body('date').optional().isISO8601().withMessage('La fecha debe tener el formato ISO 8601'),
]);

//* Sale Validations
const validateSale = withValidationErrors([
    body('productsSold').notEmpty().withMessage('Los productos vendidos son requeridos').isArray({ min: 1 }).withMessage('Los productos vendidos son requeridos'),
    body('productsSold.*.product').notEmpty().withMessage('El producto es requerido'),
    body('productsSold.*.variant').notEmpty().withMessage('La variante es requerida'),
    body('productsSold.*.quantitySold').notEmpty().withMessage('La cantidad vendida es requerida')
        .isInt({ min: 0 }).withMessage('La cantidad vendida debe ser un número positivo'),
    body('customer').notEmpty().withMessage('El cliente es requerido'),
    body('customer.name').notEmpty().withMessage('El nombre del cliente es requerido'),
    body('customer.contact').optional().isLength({ min: 5, max: 50 }).withMessage('El contacto del cliente debe tener entre 5 y 50 caracteres'),
    body('customer.phone').optional().isMobilePhone().withMessage('El teléfono del cliente debe ser válido'),
    body('paymentDetails').notEmpty().withMessage('Los detalles del pago son requeridos'),
    body('paymentDetails.method').notEmpty().withMessage('El metodo de pago es requerido')
        .isIn(['Efectivo', 'Transferencia', 'Mercadopago']).withMessage('Los detalles del pago deben ser Efectivo, Transferencia o Mercadopago'),
    body('bill').optional().isBoolean().withMessage('El campo factura debe ser un valor booleano'),
    body('status').optional().isIn(['Pendiente', 'Completado', 'Cancelada']).withMessage('El estado debe ser Pendiente, Completado o Cancelada'),
]);

//* Validate ID mongo
const validateIdParam = (model) => {
    // Array de validaciones para el parametro id
    const validateValues = [
        param('id').custom(async (value) => {
            const isValid = mongoose.Types.ObjectId.isValid(value);
            if (!isValid) throw new Error('El ID de MongoDB no es válido');

            // Buscamos el documento en la base de datos utilizando el modelo y el ID
            const document = await model.findById(value);
            if (!document) throw new Error('El documento no existe con el id: ' + value);
        }),
    ];
    // Devolvemos el middleware que maneja las validaciones
    return withValidationErrors(validateValues);
};

module.exports = {
    validateProduct,
    validateProductUpdate,
    validateVariant,
    validateVariantUpdate,
    validateCost,
    validateSale,

    // Validaciones de ID
    validateProductIdParam: validateIdParam(Product),
    validateVariantIdParam: validateIdParam(Variant),
    validateCostIdParam: validateIdParam(Cost),
    validateSaleIdParam: validateIdParam(Sale),
};