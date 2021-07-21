const { response } = require('express');
const mongoose = require('mongoose');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const searchAll = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
    ]);


    res.status(200).json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
};

const searchInCollection = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const schema = req.params.schema;

    let data = [];

    switch (schema) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
                break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'No existe el schema de busqueda'
            });
    }

    res.status(200).json({
        ok: true,
        data
    });

};


module.exports = {
    searchAll,
    searchInCollection
};