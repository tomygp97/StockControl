const mongoose = require('mongoose');
const { Schema } = mongoose;

const variantSchema = new Schema({
    color: {
        type: String,
        enum: ['Azul', 'Beige', 'Negro', 'Rojo', 'Verde'],
        required: true,
    },
    size: {
        type: String,
        enum: ['34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    }
})

const productSchema = new Schema({
    // commun properties
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantityInStock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    variants: [variantSchema],

    // custom properties
    customFields: {
        type: Schema.Types.Mixed,
    },
}, {timestamps: true,}
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
