const mongoose = require('mongoose');
const { Schema } = mongoose;

const saleSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    customer: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        contact: {
            type: String,
            trim: true,
        },
        phone: {
            type: Number,
            trimm: true,
        }
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
    paymentDetails: {
        method: {
            type: String,
            required: true,
            enum: ['Efectivo', 'Transferencia', 'Mercadopago'],
        },
    },
    bill: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true,}
);

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;