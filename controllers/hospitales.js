const { response } = require('express');
const mongoose = require('mongoose');

const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.status(200).json({
        ok: true,
        hospitales
    });
};

const crearHospital = async(req, res = response) => {

    const hospital = new Hospital({
        usuario: req.uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const actualizarHospital = async(req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar hospital'
    });
};

const eliminarHospital = async(req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Eliminar hospital'
    });
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
};