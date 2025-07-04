const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.cookies['token'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies['token'];
  if (!token) return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
