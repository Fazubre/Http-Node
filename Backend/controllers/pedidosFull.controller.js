const { procesarPedidoCompleto } = require('../services/pedidosFull.service');

const crearPedidoCompleto = async (req, res) => {
  try {
    const result = await procesarPedidoCompleto(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearPedidoCompleto
};
