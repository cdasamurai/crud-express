const AuthManager = require('../../model/AuthManager');

async function loginController(req, res) {
    const {status, message} = await AuthManager.login(req.body);
    
    return res.status(status).json(message)
}

module.exports = loginController;