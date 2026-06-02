require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const loggerMiddleware = require('./middleware/logger.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ SOLO ESTE middleware de logs
app.use(loggerMiddleware);

// Servir frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

// Rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const logsRoutes = require('./routes/logs.routes');

app.use('/api', usuariosRoutes);
app.use('/api', logsRoutes);

// Fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});
// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Servidor en http://localhost:${PORT}`);
});