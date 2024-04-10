const sql = require('mssql');

const config = {
    user: 'noble',
    password: 'Telemed2020!',
    server: 'zap2godb.database.windows.net',
    database: 'OsiguBitsBD',
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

async function conectarBaseDatos() {
    try {
        await sql.connect(config);
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
}

module.exports = { conectarBaseDatos };
