const getOrCreateProveedor = async (data, conn) => {
  console.log('[Proveedor] ===== INICIO getOrCreateProveedor =====');

  try {
    if (!data || !data.Nombre) {
      console.log('[Proveedor] No se proporcionó proveedor');
      return null;
    }

    console.log('[Proveedor] Data recibida:', data);

    console.log(`[Proveedor] Buscando por nombre: ${data.Nombre}`);

    const [result] = await conn.query(
      'SELECT ProveedorId FROM Proveedores WHERE Nombre = ?',
      [data.Nombre]
    );

    console.log('[Proveedor] Resultado query:', result);

    if (result.length > 0) {
      console.log(`[Proveedor] Ya existe → ID: ${result[0].ProveedorId}`);
      console.log('[Proveedor] ===== FIN getOrCreateProveedor =====\n');
      return result[0].ProveedorId;
    }

    console.log('[Proveedor] No existe, creando...');

    const sql = `
      INSERT INTO Proveedores
      (Nombre, PersonaDeContacto, Telefono, Correo)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      data.Nombre,
      data.PersonaDeContacto,
      data.Telefono,
      data.Correo
    ];

    console.log('[Proveedor] Ejecutando INSERT...');
    console.log('[Proveedor] Valores:', values);

    const [insertResult] = await conn.query(sql, values);

    console.log(`[Proveedor] Creado → ID: ${insertResult.insertId}`);
    console.log('[Proveedor] ===== FIN getOrCreateProveedor =====\n');

    return insertResult.insertId;

  } catch (error) {
    console.error('[Proveedor][ERROR] Fallo en getOrCreateProveedor:', error.message);
    throw error;
  }
};

module.exports = {
  getOrCreateProveedor
};