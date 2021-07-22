/* Ruta: /api/login */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;