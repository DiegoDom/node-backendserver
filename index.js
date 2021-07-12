require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

/* Conexion a la base de datos */
dbConnection();

/* Configurar CORS */
app.use(cors());

/* Rutas */
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Hola mundo!'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});