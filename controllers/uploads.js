const path = require('path');
const fs = require('fs-extra');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const { actualizarImagen } = require('../helpers/actualizar-imagen');

const uploadFileInCollection = async(req, res = response) => {

    const { schema, id } = req.params;

    /* Validamos que exista directorio y que sea un id valido */
    const isValid = await validarSchema(schema, id);
    if (!isValid) {
        return res.status(404).json({
            ok: false,
            msg: 'No parametros no validos'
        });
    }

    /* Validamos que exista un archivo */
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(404).json({
            ok: false,
            msg: 'No se subio ningun archivo valido'
        });
    }

    /* Procesar la imagen */
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ].toLowerCase();

    /* Validar extension */
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(404).json({
            ok: false,
            msg: 'Archivo no admitido...'
        });
    }

    /* Generar el nombre del archivo */
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    /* Path para guardar la imagen */
    const path = `./uploads/${ schema }/${ nombreArchivo }`;

    /* Movemos el archivo al path */
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                mgs: 'Error al guardar la imagen'
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Archivo subido con éxito',
            nombreArchivo
        });
    });

    /* Actualizar la base de datos */
    actualizarImagen(schema, id, nombreArchivo);
};

const validarSchema = async(schema, id) => {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false;
    }

    /* Listado de directorios permitidos */
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(schema)) {
        return false;
    }

    return true;
}

const getFileInCollection = async(req, res = response) => {
    const { schema, img } = req.params;
    const pathImg = path.join( __dirname, `../uploads/${ schema }/${ img }`);

    if (fs.pathExistsSync( pathImg )) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

};


module.exports = {
    uploadFileInCollection,
    getFileInCollection
};