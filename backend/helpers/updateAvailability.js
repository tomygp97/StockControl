const Variant = require('../models/variantModel');

const updateAvailability = async ( variantId ) => {
    try {
        const variant = await Variant.findById(variantId);

        variant.availability = variant.quantity > 0 ? 'Disponible' : 'Agotado';
        await variant.save();
    } catch (error) {
        throw new Error(`Error al actualizar la disponibilidad: ${error.message}`);
    }

};

module.exports = updateAvailability;