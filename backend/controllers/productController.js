const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(StatusCodes.OK).json({ products });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
        };
        res.status(StatusCodes.OK).json({ product });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const createProduct = async (req, res) => {
    try {
        const variants = req.body.variants.map(variant => ({
            color: variant.color,
            size: variant.size,
            quantity: variant.quantity
        }));

        const quantityInStock = variants.reduce((sum, variant) => sum + variant.quantity, 0);

        const newProduct = new Product({
            ...req.body,
            quantityInStock: quantityInStock,
            variants: variants,
        });
        await newProduct.save();
        res.status(StatusCodes.CREATED).json({ newProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const updateProduct = async(req, res) => {
    try {
        const updatedProduct = await Product.findById(req.params.id);
        if(!updatedProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
        };

        req.body.variants.forEach((variant) => {
            const existingVariant = updatedProduct.variants.find(v => v.color === variant.color && v.size === variant.size);
            if(existingVariant) {
                existingVariant.quantity = variant.quantity;
            }
        });

        updatedProduct.quantityInStock = updatedProduct.variants.reduce((sum, variant) => sum + variant.quantity, 0); // calculamos nuevamente stock total

        await updatedProduct.save();
        res.status(StatusCodes.OK).json({ updatedProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const deleteProduct = async (req,res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Producto no encontrado' });
        };
        res.status(StatusCodes.OK).json({ deletedProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};