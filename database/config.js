const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Base de datos conectada');
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de conectar a la base de datos');
    }
}

module.exports = {
    dbConnection
}