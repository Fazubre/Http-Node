require('dotenv').config();
const express = require('express');

const app = express();
const usuariosRoutes = require('./routes/usuarios.routes');

app.use(express.json());

// Rutas
app.use('/api', usuariosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Servidor en http://localhost:${PORT}`);
});