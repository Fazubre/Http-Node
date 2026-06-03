const express = require('express');
const router = express.Router();

const {
  crearArticulosPedido,
  obtenerArticulosPedido
} = require('../controllers/articulosPedido.controller');

router.post('/articulos-pedido', crearArticulosPedido);
router.get('/articulos-pedido', obtenerArticulosPedido);

module.exports = router;
