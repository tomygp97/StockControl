const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
    }],

    // custom properties
    customFields: {
        type: Schema.Types.Mixed,
    },
}, {timestamps: true,}
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
