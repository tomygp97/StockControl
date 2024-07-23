const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');
const Variant = require('../models/variantModel');

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
        const product = await Product.findById(req.params.id).populate('variants');
        res.status(StatusCodes.OK).json({ product });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const createProduct = async (req, res) => {
    try {
        let quantityInStock = 0;
        const newProduct = new Product({
            ...req.body,
            quantityInStock: quantityInStock,
        });
        await newProduct.save();
        res.status(StatusCodes.CREATED).json({ newProduct });
    } catch (error) { 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const createProductWithVariants = async (req, res) => {
    try {
        const { name, price, category, description, variants } = req.body;

        const newProduct = new Product({
            name,
            price,
            category,
            description,
            quantityInStock: 0,
        });

        await newProduct.save();

        // Crea las variantes
        if (variants && variants.length > 0) {
            let totalQuantity = 0;
            const variantsIds = [];
            for (const variant of variants) {
                const newVariant = new Variant({ ...variant });
                if (newVariant.quantity && newVariant.quantity > 0) {
                    newVariant.availability = 'Disponible';
                } else {
                    newVariant.availability = 'Agotado';
                }
                await newVariant.save();
                variantsIds.push(newVariant._id);
                totalQuantity += newVariant.quantity;
            }
            newProduct.variants = variantsIds;
            newProduct.quantityInStock = totalQuantity;
            await newProduct.save();
        }

        res.status(StatusCodes.CREATED).json({ newProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(StatusCodes.OK).json({ msg: "Producto Modificado Correctamente", product: updatedProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        console.log(error);
    }
};

const deleteProduct = async (req,res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
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
    createProductWithVariants,
    updateProduct,
    deleteProduct,
};