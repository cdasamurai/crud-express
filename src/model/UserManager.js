const connection = require("./db");
const filterHelper = require("../services/FilterHelper");
const { passwordHasher } = require("../services/PasswordHelper");
const User = require("../entity/User");
const EntityManager = require("./orm/EntityManager");

async function insertUser(data) {
  data.password = await passwordHasher(data.password);
  const entityManager = new EntityManager();

  return entityManager.insert(new User(), data, "user");
}

async function updateUser(id, data) {
  const entityManager = new EntityManager();

  return entityManager.update(data, data, "user", id);
}

async function deleteUser(id) {
  let sqlQuery = `DELETE FROM user where id = ${id}`;

  return connection
    .promise()
    .query(sqlQuery)
    .then(async ([rows]) => {
      return { status: 200, message: {} };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function fetchUser() {
  const sql = "SELECT * FROM user";

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function fetchOneUser(id) {
  const sql = "SELECT * FROM user WHERE id = ?";

  return connection
    .promise()
    .query(sql, id)
    .then(async ([rows]) => {
      //instanciate user object
      let user = new User();
      //set user object
      Object.keys(rows[0]).map((item) => {
        user[item] = rows[0][item];
      });

      return rows.length === 0
        ? { status: 404, message: {} }
        : { status: 200, message: user };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

async function fetchUserBy(filter) {
  //search filter (that contain)
  let { sql, values } = filterHelper.checkKindOfFilter(filter);

  //order filter (sorting)

  //date filter

  return connection
    .promise()
    .query(sql, values)
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

module.exports = {
  insertUser,
  fetchUser,
  fetchOneUser,
  fetchUserBy,
  updateUser,
  deleteUser,
};
