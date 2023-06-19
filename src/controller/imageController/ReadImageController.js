const {fetchOneImage} = require('../../model/ImageManager');

async function readImageController(req, res) {
    const {status, message} = await fetchOneImage(req.params.id);

    return res.status(status).json(message)
}

module.exports = readImageController;