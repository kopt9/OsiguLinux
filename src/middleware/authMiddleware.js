const { consultarToken } = require('../services/consulta');

async function verificarToken(req, res, next) {
    try {
        
        const token_bd = await consultarToken('osigu_clinica_med');
        const token = req.headers['authorization'];

        if (!token || token !== token_bd[0].token_valido) {
            return res.status(401).send({ error: 'Acceso denegado. Token no válido o ausente.' });
        }

        next();
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(500).send({ error: 'Error interno del servidor.' });
    }
}

module.exports = verificarToken;
