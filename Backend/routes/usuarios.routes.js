const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerUsuarios
} = require('../controllers/usuarios.controller');

// Endpoints
router.post('/usuarios', crearUsuario);
router.get('/usuarios', obtenerUsuarios);

module.exports = router;