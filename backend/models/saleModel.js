const mongoose = require('mongoose');
const { Schema } = mongoose;

const saleSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
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
            trim: true,
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
    status: {
        type: String,
        enum: ['Pendiente', 'Completado', 'Cancelada'],
        default: 'Pendiente',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true,}
);

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;