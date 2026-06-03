const db = require('../db/connection');

const crearCuentaDePresupuesto = (req, res) => {
  const {
    NumeroDeCuenta
  } = req.body;

  const sql = `
    INSERT INTO CuentasDePresupuesto 
    (NumeroDeCuenta)
    VALUES (?)
  `;


  db.query(sql, [
    NumeroDeCuenta
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al crear cuenta de presupuesto, ${err.message}` });
    }

    res.json({
      mensaje: 'Cuenta creada',
      id: result.insertId
    });
  });
};



const obtenerCuentasDePresupuesto = (req, res) => {
  const sql = 'SELECT * FROM CuentasDePresupuesto';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al obtener cuentas de presupuesto, ${err.message}` });
    }

    res.json(results);
  });
};

module.exports = {
  crearCuentaDePresupuesto,
  obtenerCuentasDePresupuesto
};