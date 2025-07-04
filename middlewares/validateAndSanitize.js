const { validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

function validateAndSanitize(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitizeHtml(req.body[key], { allowedTags: [], allowedAttributes: {} });
    }
  }
  next();
}

module.exports = validateAndSanitize;
