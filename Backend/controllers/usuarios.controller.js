const db = require('../db/connection');

const crearUsuario = (req, res) => {
  const {
    Nombres,
    Apellidos,
    CorreoPersonal,
    CorreoInstitucional,
    FechaNacimiento,
    SectorId,
    Rol,
    Nivel,
    Activo,
    Telefono,
    Identificacion
  } = req.body;

  const sql = `
    INSERT INTO Usuarios 
    (Nombres, 
    Apellidos, 
    CorreoPersonal, 
    CorreoInstitucional, 
    FechaNacimiento, 
    SectorId, 
    Rol, 
    Nivel, 
    Activo, 
    Telefono, 
    Identificacion)
    
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    Nombres,
    Apellidos,
    CorreoPersonal,
    CorreoInstitucional,
    FechaNacimiento,
    SectorId,
    Rol,
    Nivel,
    Activo,
    Telefono,
    Identificacion
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al crear usuario, ${err.message}` });
    }

    res.json({
      mensaje: 'Usuario creado',
      id: result.insertId
    });
  });
};



const obtenerUsuarios = (req, res) => {
  const sql = 'SELECT * FROM Usuarios';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al obtener usuarios, ${err.message}` });
    }

    res.json(results);
  });
};


module.exports = {
  crearUsuario,
  obtenerUsuarios
};