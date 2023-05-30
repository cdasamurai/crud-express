const express = require('express');
const router = express.Router();
const createUserController = require('../controller/CreateUserController')
const readUserController = require('../controller/ReadUserController')
const readOneUserController = require('../controller/ReadOneUserController')
const updateUserController = require('../controller/UpdateUserController')
const deleteUserController = require('../controller/DeleteUserController')

/* POST : create a new user. */
router.post('/', createUserController)

/* GET : fetch all users . */
router.get('/', readUserController)

/* GET : fetch one user . */
router.get('/:id', readOneUserController)

/* PUT : update one user . */
router.put('/:id', updateUserController)

/* DELETE : delete one user . */
router.delete('/:id', deleteUserController)

module.exports = router;