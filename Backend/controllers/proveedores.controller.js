const db = require('../db/connection');

const crearProveedor = (req, res) => {
  const {
    Nombre,
    PersonaDeContacto,
    Telefono,
    Correo
  } = req.body;

  const sql = `
    INSERT INTO Proveedores 
    (Nombre, 
    PersonaDeContacto, 
    Telefono, 
    Correo)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [
    Nombre,
    PersonaDeContacto,
    Telefono,
    Correo
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al crear proveedor, ${err.message}` });
    }

    res.json({
      mensaje: 'Proveedor creado',
      id: result.insertId
    });
  });
};



const obtenerProveedores = (req, res) => {
  const sql = 'SELECT * FROM Proveedores';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al obtener proveedores, ${err.message}` });
    }

    res.json(results);
  });
};

const ObetenrProveedorPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Proveedores WHERE ProveedorId = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener proveedor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    res.json(results[0]);
  });
};

module.exports = {
  crearProveedor,
  obtenerProveedores,
  ObetenrProveedorPorId
};
