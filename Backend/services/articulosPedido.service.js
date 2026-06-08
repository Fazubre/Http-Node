const insertArticulos = async (pedidoId, articulos, conn) => {
  console.log('[Articulos] ===== INICIO insertArticulos =====');

  try {
    if (!articulos || articulos.length === 0) {
      console.log('[Articulos] No hay artículos para insertar');
      console.log('[Articulos] ===== FIN insertArticulos =====\n');
      return;
    }

    console.log(`[Articulos] Insertando ${articulos.length} artículos`);
    console.log('[Articulos] Data:', articulos);

    const values = [];
    const placeholders = [];

    articulos.forEach(articulo => {
      placeholders.push('(?, ?, ?)');
      values.push(
        pedidoId,
        articulo.NombreArticulo,
        articulo.Cantidad
      );
    });

    const sql = `
      INSERT INTO ArticulosPedido (PedidoId, NombreArticulo, Cantidad)
      VALUES ${placeholders.join(', ')}
    `;

    console.log('[Articulos] Ejecutando INSERT...');
    console.log('[Articulos] SQL:', sql);
    console.log('[Articulos] Values:', values);

    const [result] = await conn.query(sql, values);

    console.log(`[Articulos] Insert completado → filas insertadas: ${result.affectedRows}`);
    console.log('[Articulos] ===== FIN insertArticulos =====\n');

    return result;

  } catch (error) {
    console.error('[Articulos][ERROR] Fallo en insertArticulos:', error.message);
    throw error;
  }
};

module.exports = {
  insertArticulos
};
