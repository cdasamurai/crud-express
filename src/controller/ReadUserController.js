const UserManager = require('../model/UserManager');
const qs = require('qs')

async function readUserController(req, res) {
    const {status, message} =  !req.query ? await UserManager.fetchUser() : await UserManager.fetchUserBy(qs.parse(req.query));
    
    return res.status(status).json(message)
}

module.exports = readUserController;