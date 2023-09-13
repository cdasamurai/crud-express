const argon2 = require("argon2");

async function passwordHasher(password) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    console.log(err);
  }
}

async function passwordVerification(password, hashedPassword) {
  try {
    return await argon2.verify(hashedPassword, password)
  } catch (err) {
    // internal failure
  }
}

function forgottenPasswordTokenGenerator() {
  const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  const dateOfExpiration = new Date();
  dateOfExpiration.setDate(dateOfExpiration.getDate() + 1);

  return {token, dateOfExpiration};
}

module.exports = {
  passwordHasher,
  passwordVerification,
  forgottenPasswordTokenGenerator
};
