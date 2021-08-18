const { response } = require('express');
const mongoose = require('mongoose');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

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

    try {

        const { hospital } = req.body;

        const HospitalIsValid = await validarHospital(hospital);

        if (!HospitalIsValid) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }
        
        const medico = new Medico({
            usuario: req.uid,
            ...req.body
        });

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

    const id = req.params.id;
    const uid = req.uid;

    try {

        const isValid = await validarMedico(id);

        if (!isValid) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            });
        }


        const { hospital, ...campos } = req.body;

        const HospitalIsValid = await validarHospital(hospital);

        if (!HospitalIsValid) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        campos.hospital = hospital;
        campos.usuario = uid;

        const medicoActualizado = await Medico.findByIdAndUpdate(id, campos, { new: true });

        res.status(200).json({
            ok: true,
            medico: medicoActualizado
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};

const eliminarMedico = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const isValid = await validarMedico(uid);

        if (!isValid) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un medico con ese id'
            });
        }

        await Medico.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
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

const validarMedico = async (uid) => {
    
    if (!mongoose.Types.ObjectId.isValid(uid)) {
       return false;
    }

    const medicoDB = await Medico.findById(uid);

    if (!medicoDB) {
        return false;
    }

    return true;
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
};