const express = require('express');
const router = express.Router();

const {
  crearProveedor,
  obtenerProveedores
} = require('../controllers/proveedores.controller');

router.post('/proveedores', crearProveedor);
router.get('/proveedores', obtenerProveedores);

module.exports = router;
