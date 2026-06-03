const express = require('express');
const router = express.Router();

const {
  crearPedido,
  obtenerPedidos
} = require('../controllers/pedidos.controller');

router.post('/pedidos', crearPedido);
router.get('/pedidos', obtenerPedidos);

module.exports = router;