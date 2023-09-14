const express = require('express');
const CreateClassController = require("../controller/classControllers/CreateClassController");
const router = express.Router();

router.post('/', CreateClassController);

module.exports = router;