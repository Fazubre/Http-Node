const express = require('express');
const router = express.Router();

const {
  crearPedidoCompleto
} = require('../controllers/pedidosFull.controller');

router.post('/pedidos/full', crearPedidoCompleto);

module.exports = router;