const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/logs', (req, res) => {
  const limit = parseInt(req.query.limit) || 100;

  const sql = `SELECT * FROM logs ORDER BY id DESC LIMIT ?`;

  db.query(sql, [limit], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.get('/logs/count', (req, res) => {
  db.query('SELECT COUNT(*) as total FROM logs', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ total: result[0].total });
  });
});

module.exports = router;
