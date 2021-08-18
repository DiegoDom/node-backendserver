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

const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const isValid = await validarHospital(id);

        if (!isValid) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const eliminarHospital = async(req, res = response) => {


    const uid = req.params.id;

    try {

        const isValid = await validarHospital(uid);

        if (!isValid) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        await Hospital.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const validarHospital = async (uid) => {
    
    if (!mongoose.Types.ObjectId.isValid(uid)) {
       return false;
    }

    const hospitalDB = await Hospital.findById(uid);
    if (!hospitalDB) {
        return false;
    }

    return true;
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
};