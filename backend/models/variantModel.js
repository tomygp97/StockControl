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

const Variant = mongoose.model('Variant', variantSchema);
module.exports = Variant