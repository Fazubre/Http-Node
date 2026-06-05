const db = require('../db/connection');

const crearArticulosPedido = (req, res) => {
  const {
    PedidoId,
    NombreArticulo,
    Cantidad
  } = req.body;

  const sql = `
    INSERT INTO ArticulosPedido 
    (PedidoId, NombreArticulo, Cantidad)
    VALUES (?, ?, ?)
  `;


  db.query(sql, [
    PedidoId,
    NombreArticulo,
    Cantidad
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al crear artículo del pedido, ${err.message}` });
    }

    res.json({
      mensaje: 'Artículo del pedido creado',
      id: result.insertId
    });
  });
};



const obtenerArticulosPedido = (req, res) => {
  const sql = 'SELECT * FROM ArticulosPedido';

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al obtener Articulos del Pedido, ${err.message}` });
    }

    res.json(results);
  });
};



const obtenerArticulosPedidobyPedidoId = (req, res) => {{
  const { PedidoId } = req.params;

  const sql = 'SELECT * FROM ArticulosPedido WHERE PedidoId = ?';

  db.query(sql, [PedidoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al obtener artículos del pedido, ${err.message}` });
    }

    res.json(results);
  });
};


  const sql = `
    INSERT INTO ArticulosPedido 
    (PedidoId, NombreArticulo, Cantidad)
    VALUES (?, ?, ?)
  `;


  db.query(sql, [
    PedidoId,
    NombreArticulo,
    Cantidad
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: `Error al crear artículo del pedido, ${err.message}` });
    }

    res.json({
      mensaje: 'Artículo del pedido creado',
      id: result.insertId
    });
  });
};

module.exports = {
  crearArticulosPedido,
  obtenerArticulosPedido,
  obtenerArticulosPedidobyPedidoId
};