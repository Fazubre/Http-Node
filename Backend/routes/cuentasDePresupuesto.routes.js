const express = require('express');
const router = express.Router();

const {
  crearCuentaDePresupuesto,
  obtenerCuentasDePresupuesto
} = require('../controllers/cuentasDePresupuesto.controller');

router.post('/cuentas-de-presupuesto', crearCuentaDePresupuesto);
router.get('/cuentas-de-presupuesto', obtenerCuentasDePresupuesto);

module.exports = router;
