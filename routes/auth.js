const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateAndSanitize = require('../middlewares/validateAndSanitize');
const authController = require('../controllers/authController');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimit');

const usernameValidator = body('username')
  .isLength({ min: 4, max: 20 }).withMessage('Username 4-20 karakter')
  .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username hanya huruf, angka, _');
const passwordValidator = body('password')
  .isLength({ min: 6, max: 32 }).withMessage('Password 6-32 karakter');

router.post('/register', registerLimiter, usernameValidator, passwordValidator, validateAndSanitize, authController.register);
router.post('/login', loginLimiter, usernameValidator, passwordValidator, validateAndSanitize, authController.login);

module.exports = router;
