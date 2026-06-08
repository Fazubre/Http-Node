const getOrCreateCuenta = async (data, conn) => {
  console.log('[Cuenta] ===== INICIO getOrCreateCuenta =====');

  try {
    if (!data || !data.NumeroDeCuenta) {
      throw new Error('NumeroDeCuenta es requerido');
    }

    console.log('[Cuenta] Buscando cuenta:', data.NumeroDeCuenta);

    const [result] = await conn.query(
      'SELECT CuentaDePresupuestoId FROM CuentasDePresupuesto WHERE NumeroDeCuenta = ?',
      [data.NumeroDeCuenta]
    );

    console.log('[Cuenta] Resultado query:', result);

    if (result.length > 0) {
      console.log(`[Cuenta] Ya existe → ID: ${result[0].CuentaDePresupuestoId}`);
      console.log('[Cuenta] ===== FIN getOrCreateCuenta =====\n');
      return result[0].CuentaDePresupuestoId;
    }

    console.log('[Cuenta] No existe, creando...');

    const sql = `
      INSERT INTO CuentasDePresupuesto (NumeroDeCuenta)
      VALUES (?)
    `;

    console.log('[Cuenta] Ejecutando INSERT...');

    const [insertResult] = await conn.query(sql, [data.NumeroDeCuenta]);

    console.log(`[Cuenta] Creada → ID: ${insertResult.insertId}`);
    console.log('[Cuenta] ===== FIN getOrCreateCuenta =====\n');

    return insertResult.insertId;

  } catch (error) {
    console.error('[Cuenta][ERROR] Fallo en getOrCreateCuenta:', error.message);
    throw error;
  }
};

module.exports = {
  getOrCreateCuenta
};
