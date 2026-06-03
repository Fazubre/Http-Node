const db = require('../db/connection');

const crearPedido = (req, res) => {
  const {
    PedidoId,
    UsuarioId,
    StatusId,
    ProveedorId,
    CuentaDePresupuestoId,
    PrioridadId,
    SectorId,
    FechaPedido,
    FechaAprobacion,
    FechaRequerida,
    FechaEntrega,
    JustificacionDePedido
  } = req.body;

  const sql = `
    INSERT INTO Pedidos 
    (PedidoId, 
    UsuarioId, 
    StatusId, 
    ProveedorId, 
    CuentaDePresupuestoId, 
    PrioridadId, 
    SectorId, 
    FechaPedido, 
    FechaAprobacion, 
    FechaRequerida, 
    FechaEntrega, 
    JustificacionDePedido)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    PedidoId,
    UsuarioId,
    StatusId,
    ProveedorId,
    CuentaDePresupuestoId,
    PrioridadId,
    SectorId,
    FechaPedido,
    FechaAprobacion,
    FechaRequerida,
    FechaEntrega,
    JustificacionDePedido
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al crear pedido' });
    }

    res.json({
      mensaje: 'Pedido creado',
      id: result.insertId
    });
  });
};


const obtenerPedidos = (req, res) => {
  const sql = 'SELECT * FROM Pedidos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener pedidos' });
    }

    res.json(results);
  });
};

module.exports = {
  crearPedido,
  obtenerPedidos
};
