const fs = require('fs-extra');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const actualizarImagen = async(schema, id, nombreArchivo) => {

    switch (schema) {
        case 'usuarios': {
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            const pathViejo = `./uploads/usuarios/${ usuario.img }`;
            reemplazarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        }
        case 'hospitales': {
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }

            const pathViejo = `./uploads/hospitales/${ hospital.img }`;
            reemplazarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        }
        case 'medicos': {
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }

            const pathViejo = `./uploads/medicos/${ medico.img }`;
            reemplazarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        }
        default:
            return res.status(400).json({
                ok: false,
                msg: 'No existe el schema de busqueda'
            });
    }

};

const reemplazarImagen = (path) => {
    if (fs.pathExistsSync( path )) {
        /* Eliminar la imagen anterior */
        fs.removeSync( path );
    }
};

module.exports = {
    actualizarImagen
};