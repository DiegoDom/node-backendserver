/* Ruta: /api/upload */
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { uploadFileInCollection, getFileInCollection } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.put('/:schema/:id', validarJWT, uploadFileInCollection);

router.get('/:schema/:img', getFileInCollection);

module.exports = router;