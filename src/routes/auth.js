const express = require('express');
const router = express.Router();
const {loginController, logoutController} = require('../controller/authControllers/LoginController');

/* POST : login a user. */
router.post('/login', loginController)
router.post('/logout', logoutController)

module.exports = router;