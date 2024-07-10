const Variant = require('../models/variantModel');
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');
// Helpers
const increaseStockOnNewVariant = require('../helpers/increaseStockOnNewVariant');
const adjustStockOnVariantUpdate = require('../helpers/adjustStockOnVariantUpdate');
const updateAvailability = require('../helpers/updateAvailability');

const getAllVariants = async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('variants');
        res.status(StatusCodes.OK).json({ variants: product.variants });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const getVariantById = async(req, res) => {
    try {
        const variant = req.variant;
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
        // Agrego Id de variante a la lista de variantes
        product.variants.push(newVariant._id);
        await product.save();
        // Actualizo el stock
        await increaseStockOnNewVariant(product._id, newVariant.quantity);
        
        // Actualizo la disponibilidad de la variante
        await updateAvailability(newVariant._id);
        

        res.status(StatusCodes.CREATED).json({ newVariant });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const updateVariant = async(req, res) => {
    try {
        const {id: productId, variantId} = req.params;
        const { color, size, quantity } = req.body;
        const currentVariant = await Variant.findById(variantId);

        // Verifica si la cantidad ha cambiado y calcula la diferencia
        let quantityDifference = 0;
        if(quantity !== undefined && quantity !== currentVariant.quantity) {
            quantityDifference = quantity - currentVariant.quantity;
        }

        // Actualiza la variante con los nuevos valores
        const updatedVariant = await Variant.findByIdAndUpdate(variantId, {color, size, quantity}, {new: true});

        // Si hay una diferencia en la cantidad, ajusta el stock
        if(quantityDifference !== 0) {
            await adjustStockOnVariantUpdate(productId, quantityDifference);
        };

        res.status(StatusCodes.OK).json({ updatedVariant });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

const deleteVariant = async(req, res) => {
    try {
        const { id: productId, variantId } = req.params;

        // Elimina la variante
        const deletedVariant = await Variant.findByIdAndDelete(variantId);

        // Actualiza el producto para quitar la referencia de la variante eliminada
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $pull: { variants: variantId } },
            { new: true }
        );

        // Actualiza el stock del producto
        updatedProduct.quantityInStock -= deletedVariant.quantity;
        if (updatedProduct.quantityInStock < 0) {
            updatedProduct.quantityInStock = 0;
            // TODO: Enviar un error de stock insuficiente si es necesario
        }

        // Guarda el producto actualizado
        await updatedProduct.save();

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