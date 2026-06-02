const db = require('../db/connection');

const loggerMiddleware = (req, res, next) => {
  const url = req.originalUrl;

  // ❌ ignorar endpoints del sistema
  if (
    url.startsWith('/api/logs') ||
    url.startsWith('/api/status') ||
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url === '/'
  ) {
    return next();
  }

  const start = Date.now();

  res.on('finish', () => {
    const responseTime = Date.now() - start;

    const sql = `
      INSERT INTO logs (method, endpoint, status, response_time, ip)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      req.method,
      url,
      res.statusCode,
      responseTime,
      req.ip
    ]);
  });

  next();
};

module.exports = loggerMiddleware;
