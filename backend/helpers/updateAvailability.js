const Variant = require('../models/variantModel');

const updateAvailability = async ( variantId, session = null ) => {
    try {
        const variant = session ? 
            await Variant.findById(variantId).session(session)
            : await Variant.findById(variantId);

        variant.availability = variant.quantity > 0 ? 'Disponible' : 'Agotado';

        if(session) {
            await variant.save({ session });
        } else {
            await variant.save();
        };
    } catch (error) {
        throw new Error(`Error al actualizar la disponibilidad: ${error.message}`);
    };
};

module.exports = updateAvailability;