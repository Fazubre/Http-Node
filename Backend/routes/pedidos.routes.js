const express = require('express');
const router = express.Router();

const {
  crearPedido,
  obtenerPedidos,
  ObetenrPedidoPorId
} = require('../controllers/pedidos.controller');

router.post('/pedidos', crearPedido);
router.get('/pedidos', obtenerPedidos);
router.get('/pedidos/:id', ObetenrPedidoPorId);
module.exports = router;