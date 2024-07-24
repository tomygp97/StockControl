const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
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
    },
    email: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    notes: {
        type: String,
        trim: true,
    }
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer