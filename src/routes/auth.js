const express = require('express');
const router = express.Router();
const authController = require('../controller/authControllers/LoginController');

/* POST : login a user. */
router.post('/login', authController)

module.exports = router;