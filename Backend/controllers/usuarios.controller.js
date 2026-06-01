const db = require('../db/connection');

// Crear usuario
const crearUsuario = (req, res) => {
  const { nombre, edad } = req.body;

  const sql = 'INSERT INTO usuarios (nombre, edad) VALUES (?, ?)';

  db.query(sql, [nombre, edad], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al insertar' });
    }

    res.json({
      mensaje: 'Usuario creado',
      id: result.insertId
    });
  });
};

// Obtener usuarios
const obtenerUsuarios = (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }

    res.json(results);
  });
};

module.exports = {
  crearUsuario,
  obtenerUsuarios
};