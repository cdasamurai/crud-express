const express = require('express');
const router = express.Router();
const createPostController = require('../controller/postControllers/CreatePostController')
const securityMiddleware = require('../middleware/securityMiddleware');

/* POST : create a new user. */
router.post('/', securityMiddleware, createPostController)

/* GET : fetch all users . */
//router.get('/', securityMiddleware, readUserController)
module.exports = router;
