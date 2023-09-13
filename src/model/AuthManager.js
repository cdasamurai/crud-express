const connection = require('./db');
const {passwordVerification} = require('../services/PasswordHelper');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('jwtRS256.key');
const {forgottenPasswordTokenGenerator} = require('../services/PasswordHelper');
const kindChecker = require('../services/EmailSenderService');

function login({email, password}) {
    return connection.promise().query('SELECT * FROM user WHERE email = ?', [email])
        .then(async ([rows]) => {
            if (rows.length === 0) {
                return {status: 401, message: 'Email or password is wrong'}
            }
            if (!await passwordVerification(password, rows[0].password)) {
                return {status: 401, message: 'Email or password is wrong'}
            }

            const token = jwt.sign({ userId: rows[0].id }, privateKey, { algorithm: 'RS256' });

            return {status: 200, message: {token: token}}
        })
}

function passwordForgotten({email}) {
    return connection.promise().query('SELECT * FROM user WHERE email = ?', [email])
        .then(async ([rows]) => {
            if (rows.length === 0) {
                return {status: 404, message: "Email doesn't exist"}
            }

            const token = await updatePasswordTokenAndDateOfExpiration(email);
            kindChecker('PASSWORD_FORGOTTEN', {email: email, token: token})

            return {status: 200, message: 'success'}
        })
}

async function updatePasswordTokenAndDateOfExpiration (email) {
    const {token, dateOfExpiration} = forgottenPasswordTokenGenerator();

    connection.promise().query('UPDATE user SET password_token = ?, password_token_expiration = ? where email = ?', [token, dateOfExpiration, email])
        .catch(error => console.log(error))

    return token;
}

module.exports = {
    login,
    passwordForgotten
};