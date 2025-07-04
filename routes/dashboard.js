const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');

router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to dashboard', user: req.user });
});

module.exports = router;
