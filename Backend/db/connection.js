const mysql = require('mysql2');
    
// Crear conexión
const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE 
});

// Conectar
db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('MySQL conectado');
});

module.exports = db;