const createPedido = async (data, conn) => {
  console.log('[Pedido] ===== INICIO createPedido =====');

  try {
    const {
      UsuarioId,
      ProveedorId,
      CuentaDePresupuestoId,
      PrioridadId,
      SectorId,
      FechaRequerida,
      JustificacionDePedido,
      JustificacionAceptacion
    } = data;

    console.log('[Pedido] Data recibida:', data);

    const sql = `
      INSERT INTO Pedidos
      (
        UsuarioId,
        StatusId,
        ProveedorId,
        CuentaDePresupuestoId,
        PrioridadId,
        SectorId,
        FechaPedido,
        FechaAprobacion,
        FechaRequerida,
        JustificacionDePedido,
        JustificacionAceptacion
      )
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NULL, ?, ?, ?)
    `;

    const values = [
      UsuarioId,
      2,
      ProveedorId || null,
      CuentaDePresupuestoId,
      PrioridadId,
      SectorId,
      FechaRequerida,
      JustificacionDePedido,
      JustificacionAceptacion
    ];

    console.log('[Pedido] Ejecutando INSERT...');
    console.log('[Pedido] Valores:', values);

    const [result] = await conn.query(sql, values);

    console.log(`[Pedido] Pedido creado → ID: ${result.insertId}`);
    console.log('[Pedido] ===== FIN createPedido =====\n');

    return result.insertId;

  } catch (error) {
    console.error('[Pedido][ERROR] Fallo en createPedido:', error.message);
    throw error;
  }
};

module.exports = {
  createPedido
};