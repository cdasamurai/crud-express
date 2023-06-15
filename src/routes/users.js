const express = require('express');
const router = express.Router();
const createUserController = require('../controller/userControllers/CreateUserController')
const readUserController = require('../controller/userControllers/ReadUserController')
const readOneUserController = require('../controller/userControllers/ReadOneUserController')
const updateUserController = require('../controller/userControllers/UpdateUserController')
const deleteUserController = require('../controller/userControllers/DeleteUserController');
const securityMiddleware = require('../middleware/securityMiddleware');

/* POST : create a new user. */
router.post('/', createUserController)

/* GET : fetch all users . */
// router.get('/', securityMiddleware, readUserController)
router.get('/', readUserController)

/* GET : fetch one user . */
router.get('/:id', readOneUserController)

/* PUT : update one user . */
router.put('/:id', updateUserController)

/* DELETE : delete one user . */
router.delete('/:id', deleteUserController)

module.exports = router;