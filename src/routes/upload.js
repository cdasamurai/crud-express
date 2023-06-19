const express = require('express');
const router = express.Router();
const upload = require('../services/UploadHelper');
const CreateImageController = require('../controller/imageController/CreateImageController')
const ReadImageController = require('../controller/imageController/ReadImageController')

router.post('/', upload.single("avatar"), CreateImageController);
router.get('/:id', ReadImageController);

module.exports = router;
