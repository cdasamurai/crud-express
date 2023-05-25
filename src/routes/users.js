const express = require('express');
const router = express.Router();
const createUserController = require('../controller/CreateUserController')
const readUserController = require('../controller/ReadUserController')
const readOneUserController = require('../controller/ReadOneUserController')

/* POST : create a new user. */
router.post('/', createUserController)

/* GET : fetch all users . */
router.get('/', readUserController)

/* GET : fetch one user . */
router.get('/:id', readOneUserController)




module.exports = router;