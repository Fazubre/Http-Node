const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/logs', (req, res) => {
  db.query('SELECT * FROM logs ORDER BY id DESC LIMIT 50', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
