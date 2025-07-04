const rateLimit = require('express-rate-limit');
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: 'Terlalu banyak percobaan login, coba lagi nanti.' },
  standardHeaders: true,
  legacyHeaders: false,
});
const registerLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: 'Terlalu banyak percobaan register, coba lagi nanti.' },
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = { loginLimiter, registerLimiter };
