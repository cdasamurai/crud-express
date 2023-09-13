const AuthManager = require('../../model/AuthManager');

async function passwordForgottenController(req, res) {
    const {status, message} = await AuthManager.passwordForgotten(req.body);

    return res.status(status).json(message)
}

module.exports = passwordForgottenController;