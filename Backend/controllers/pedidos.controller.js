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
      return res.status(500).json({ error: `Error al crear pedido, ${err.message}` });
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
      return res.status(500).json({ error: `Error al obtener pedidos, ${err.message}` });
    }

    res.json(results);
  });
};

const ObetenrPedidoPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Pedidos WHERE PedidoId = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener pedido' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(results[0]);
  });
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  ObetenrPedidoPorId
};