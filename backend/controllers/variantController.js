const Variant = require('../models/variantModel');
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');

//! Verificar si es necesaria
const getAllVariants = async(req, res) => {
        try {
            const variants = await Variant.find({});
            res.status(StatusCodes.OK).json({ variants });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
};
const getVariantById = async(req, res) => {
    try {
        const variantId = req.params.variantId;
        const variant = await Variant.findById(variantId);
        if(!variant) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Variante no encontrada' });
        };
        res.status(StatusCodes.OK).json({ variant });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
const createVariant = async(req, res) => {
    try {
        const newVariant = new Variant({ ...req.body });
        await newVariant.save();

        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
        };
        // Agrego Id de variante a la lista de variantes
        product.variants.push(newVariant._id);
        // Actualizo el stock
        product.quantityInStock += newVariant.quantity;
        await product.save();

        res.status(StatusCodes.CREATED).json({ newVariant });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

//TODO hacer las validaciones en un middleware
const updateVariant = async(req, res) => {
    try {
        const variantId = req.params.variantId;
        const { color, size, quantity } = req.body;

        const currentVariant = await Variant.findById(variantId);
        if (!currentVariant) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Variante no encontrada' });
        };

        // calcula la diferencia de la cantidad solo si se ha proporcionado una nueva cantidad
        let quantityDifference = 0;
        if(quantity !== undefined) {
            quantityDifference = quantity - currentVariant.quantity;
        };

        // actualiza la variante con los nuevos valores
        const updatedVariant = await Variant.findByIdAndUpdate(variantId, { color, size, quantity }, { new: true });
        if (!updatedVariant) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Variante no encontrada' });
        };

        // Si la cantidad ha cambiado, actualizo la cantidad total en stock del producto
        if(quantityDifference !== 0) {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
            };
            product.quantityInStock += quantityDifference;
            await product.save();
        };

        res.status(StatusCodes.OK).json({ updatedVariant });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const deleteVariant = async(req, res) => {
    try {
        const deletedVariant = Variant.findByIdAndDelete(req.params.variantId);
        if(!deletedVariant) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Variante no encontrada' });
        };
        res.status(StatusCodes.OK).json({ deletedVariant });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

module.exports = {
    getAllVariants,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant,
};