const db = require('../db/connection');

const { getOrCreateUsuario } = require('./usuarios.service');
const { getOrCreateProveedor } = require('./proveedores.service');
const { getOrCreateCuenta } = require('./cuentasDePresupuesto.service');
const { createPedido } = require('./pedidos.service');
const { insertArticulos } = require('./articulosPedido.service');


const procesarPedidoCompleto = async (data) => {
  const conn = await db.promise().getConnection();

  try {
    console.log('[START] Iniciando proceso de pedido completo');

    await conn.beginTransaction();
    console.log('[TRANSACTION] Transacción iniciada');

    const usuarioId = await getOrCreateUsuario(data.usuario, conn);
    console.log(`[STEP] Usuario listo → ID: ${usuarioId}`);
 
    let proveedorId = null;
    if (data.proveedor) {
      proveedorId = await getOrCreateProveedor(data.proveedor, conn);
      console.log(`[STEP] Proveedor listo → ID: ${proveedorId}`);
    } else {
      console.log('[STEP] No hay proveedor');
    }

    const cuentaId = await getOrCreateCuenta(data.cuenta, conn);
    console.log(`[STEP] Cuenta lista → ID: ${cuentaId}`);

    const pedidoId = await createPedido({
      UsuarioId: usuarioId,
      ProveedorId: proveedorId,
      CuentaDePresupuestoId: cuentaId,
      PrioridadId: data.pedido.PrioridadId,
      SectorId: data.pedido.SectorId,
      FechaRequerida: data.pedido.FechaRequerida,
      JustificacionDePedido: data.pedido.JustificacionDePedido,
      JustificacionAceptacion: data.pedido.JustificacionAceptacion
    }, conn);

    console.log(`[STEP] Pedido creado → ID: ${pedidoId}`);

    await insertArticulos(pedidoId, data.articulos, conn);
    console.log(`[STEP] Artículos insertados → Total: ${data.articulos?.length || 0}`);

    await conn.commit();
    console.log('[SUCCESS] Transacción completada correctamente');

    return {
      mensaje: 'Pedido creado correctamente',
      pedidoId
    };

  } catch (error) {
    console.error('[ERROR] Falló el proceso:', error.message);

    await conn.rollback();
    console.log('[ROLLBACK] Transacción cancelada');

    throw error;

  } finally {
    conn.release();
    console.log('[END] Conexión liberada\n');
  }
};

module.exports = {
  procesarPedidoCompleto
};
