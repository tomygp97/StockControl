const mongoose = require('mongoose');
const { Schema } = mongoose;

const saleSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantitySold: {
        type: Number,
        required: true,
        min: 0,
    },
    totalPrice : {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true,}
);

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;