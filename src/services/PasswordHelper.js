const argon2 = require('argon2');

async function passwordHasher(password) {
    try {
        return await argon2.hash(password);
      } catch (err) {
        console.log(err)
      }
}

module.exports = {
    passwordHasher
}