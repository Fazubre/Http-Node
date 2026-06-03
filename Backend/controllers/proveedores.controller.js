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
      return res.status(500).json({ error: 'Error al crear proveedor' });
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
      return res.status(500).json({ error: 'Error al obtener proveedores' });
    }

    res.json(results);
  });
};

module.exports = {
  crearProveedor,
  obtenerProveedores
};