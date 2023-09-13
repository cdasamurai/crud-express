const express = require('express');
const router = express.Router();
const authController = require('../controller/authControllers/LoginController');
const passwordForgottenController = require('../controller/authControllers/PasswordForgottenController');
const passwordResetController = require('../controller/authControllers/PasswordResetController');

/* POST : login a user. */
router.post('/login', authController);

router.post('/password_forgotten', passwordForgottenController);
router.post('/password_reset', passwordResetController);

module.exports = router;