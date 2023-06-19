const {insertImage} = require('../../model/ImageManager');

async function createImageController(req, res) {
    const {status, message} = await insertImage(req.file.filename);

    return res.status(status).json(message)
}

module.exports = createImageController;