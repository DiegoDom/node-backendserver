/* Ruta: /api/buscar */
const { Router } = require('express');

const { searchAll, searchInCollection } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, searchAll);

router.get('/:schema/:busqueda', validarJWT, searchInCollection);

module.exports = router;