const getOrCreateUsuario = async (data, conn) => {
  console.log('[Usuario] ===== INICIO getOrCreateUsuario =====');

  try {
    const [result] = await conn.query(
      'SELECT UsuarioId FROM Usuarios WHERE CorreoInstitucional = ?',
      [data.CorreoInstitucional]
    );

    console.log('[Usuario] Resultado query:', result);

    if (result.length > 0) {
      console.log(`[Usuario] Usuario existe → ID: ${result[0].UsuarioId}`);
      return result[0].UsuarioId;
    }

    console.log('[Usuario] Usuario no existe, creando...');

    const sql = `
      INSERT INTO Usuarios
      (Nombres, Apellidos, CorreoPersonal, CorreoInstitucional,
       FechaNacimiento, SectorId, Rol, Nivel, Activo, Telefono, Identificacion)
      VALUES (?, ?, ?, ?, ?, ?, 2, ?, 1, ?, ?)
    `;

    const values = [
      data.Nombres,
      data.Apellidos,
      data.CorreoPersonal,
      data.CorreoInstitucional,
      data.FechaNacimiento,
      data.SectorId,
      data.Nivel,
      data.Telefono,
      data.Identificacion
    ];

    const [insertResult] = await conn.query(sql, values);

    console.log(`[Usuario] Usuario creado → ID: ${insertResult.insertId}`);

    return insertResult.insertId;

  } catch (error) {
    console.error('[Usuario][ERROR]:', error.message);
    throw error;
  }
};

module.exports = {
  getOrCreateUsuario
};