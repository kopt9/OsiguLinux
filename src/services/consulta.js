const sql = require('mssql');
const { conectarBaseDatos } = require('./conexion');

async function consultarBaseDeDatos(query) {
    try {
        await conectarBaseDatos();
        const resultado = await sql.query(query);
        return resultado.recordset;
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        throw error;
    } finally {
        await sql.close();
    }
}

async function consultarToken(client_id) {
    //const client_id ='osigu_clinica_med';
    const query = `SELECT token_valido FROM cliente WHERE client_id = '${client_id}'`;
    try {
        const resultado = await consultarBaseDeDatos(query);
        return resultado;
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }
}

async function insertarCita(transaccion_id, mensaje, cita_id, tipo_agenda, estado_transaccion, tipo_operacion) {
    try {
        await conectarBaseDatos();
        const query = `
            INSERT INTO va_clinica_med_asist (transaccion_id,
            mensaje,
            cita_id,
            tipo_agenda,
            estado_transaccion,
            tipo_operacion)
            VALUES (@transaccion_id,
                @mensaje,
                @cita_id,
                @tipo_agenda,
                @estado_transaccion,
                @tipo_operacion)
        `;
        const params = {
            transaccion_id: sql.NVarChar(50),
            mensaje: sql.NVarChar(100),
            cita_id: sql.NVarChar(10),
            tipo_agenda: sql.NVarChar(25),
            estado_transaccion: sql.NVarChar(10),
            tipo_operacion: sql.NVarChar(15),
        };
        const request = new sql.Request();
        request.input('transaccion_id', sql.NVarChar, transaccion_id);
        request.input('mensaje', sql.NVarChar, mensaje);
        request.input('cita_id', sql.NVarChar, cita_id);
        request.input('tipo_agenda', sql.NVarChar, tipo_agenda);
        request.input('estado_transaccion', sql.NVarChar, estado_transaccion);
        request.input('tipo_operacion', sql.NVarChar, tipo_operacion);
        const result = await request.query(query);
        console.log('Registro insertado correctamente.');
    } catch (error) {
        console.error('Error al insertar el registro:', error);
    }
}

async function consultarDatos() {
    const query = 'SELECT * FROM va_clinica_med_asist';
    try {
        const resultados = await consultarBaseDeDatos(query);
        console.log('Resultados de la consulta:', resultados);
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
    }
}

module.exports = { insertarCita, consultarDatos, consultarToken };
