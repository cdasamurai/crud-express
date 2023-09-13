const UserManager = require('../../model/UserManager');
const qs = require('qs');

async function passwordResetController(req, res) {
    const user = await UserManager.fetchUserBy(res, qs.parse(req.query));
    const {status, message} = await UserManager.updateUser(user.message[0].id, req.body, true);

    return res.status(status).json(message)
}

module.exports = passwordResetController;