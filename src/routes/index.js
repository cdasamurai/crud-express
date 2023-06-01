const express = require('express');
const router = express.Router();
const securityMiddleware = require('../middleware/securityMiddleware')

/* GET home page. */
router.get('/', securityMiddleware, function(req, res, next) {
  res.json("coucou");
});

module.exports = router;
