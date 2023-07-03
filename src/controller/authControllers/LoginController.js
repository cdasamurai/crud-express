const AuthManager = require('../../model/AuthManager');

async function loginController(req, res) {
    const {status, message} = await AuthManager.login(req.body);
    
    return res
        .cookie("token", message.token, {
            httpOnly: true
        })
        .status(status).json(message)
}
async function logoutController(req, res) {

    return res.clearCookie("token")
        .status(200).json("Successfully logged out")
}

module.exports = {
    loginController,
    logoutController
};