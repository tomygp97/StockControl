const mongoose = require('mongoose');
const { Schema } = mongoose;

const costSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true,}
);

const Cost = mongoose.model('Cost', costSchema);
module.exports = Cost;