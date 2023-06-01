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

module.exports = {
  passwordHasher,
  passwordVerification
};
