const { insertarCita } = require('../services/consulta');
const citaSchema = require('../schemas/citaSchema');

async function confirmarCita(req, res) {
    try {
        const { error } = citaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { message_id, message, response, status } = req.body;
        await insertarCita(message_id, message, response.unique_id.toString(), response.schedule_type, status, 'confirmar');
        res.status(200).json({ message: 'Validación exitosa.' });
    } catch (error) {
        console.error('Error al confirmar cita:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

async function cancelarCita(req, res) {
    try {
        const { error } = citaSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { message_id, message, response, status } = req.body;
        await insertarCita(message_id, message, response.unique_id.toString(), response.schedule_type, status, 'cancelar');
        res.status(200).json({ message: 'Validación exitosa.' });
    } catch (error) {
        console.error('Error al cancelar cita:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

module.exports = { confirmarCita, cancelarCita };
