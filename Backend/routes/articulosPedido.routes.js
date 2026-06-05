const express = require('express');
const router = express.Router();

const {
  crearArticulosPedido,
  obtenerArticulosPedido,
  obtenerArticulosPedidobyPedidoId
} = require('../controllers/articulosPedido.controller');

router.post('/articulos-pedido', crearArticulosPedido);
router.get('/articulos-pedido', obtenerArticulosPedido);
router.get('/articulos-pedido/:PedidoId', obtenerArticulosPedidobyPedidoId);

module.exports = router;
