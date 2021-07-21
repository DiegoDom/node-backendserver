const { response } = require('express');
const mongoose = require('mongoose');

const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img');

    res.status(200).json({
        ok: true,
        medicos
    });
};

const crearMedico = async(req, res = response) => {

    const medico = new Medico({
        usuario: req.uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const actualizarMedico = async(req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar medico'
    });
};

const eliminarMedico = async(req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Eliminar medico'
    });
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
};