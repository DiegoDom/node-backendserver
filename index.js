require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

/* Configurar CORS */
app.use(cors());

/* Configurar lectura y parseo del body */
app.use(express.json());

/* Conexion a la base de datos */
dbConnection();

/* Rutas */
app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});