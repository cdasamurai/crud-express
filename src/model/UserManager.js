const connection = require('./db');
const filterHelper = require('../services/FilterHelper');
const { passwordHasher } = require('../services/PasswordHelper');
const User = require('../entity/User');
const EntityManager = require('./orm/EntityManager');

async function insertUser(data) {
    data.password = await passwordHasher(data.password)
    const entityManager = new EntityManager();

    return entityManager.insert(new User(), data, 'user');
}

async function updateUser(id, data) {
    if (data.password) {
        data.password = await passwordHasher(data.password)
    }

    data.id = id

    const entityManager = new EntityManager();
    return entityManager.update(new User(), data, 'user');
}

async function deleteUser(id) {
    const entityManager = new EntityManager();
    return entityManager.delete(new User(), {id}, 'user');
}

async function fetchUser() {
    const entityManager = new EntityManager();
    return entityManager.fetchAll(new User(), 'user');
}

async function fetchOneUser(id) {
    const entityManager = new EntityManager();
    return entityManager.fetchOne(new User(), {id}, 'user');
}

async function fetchUserBy(filter) {
    //search filter (that contain)
    let { sql, values } = filterHelper.checkKindOfFilter(filter);


    //order filter (sorting)

    //date filter 

    return connection.promise().query(sql, values)
        .then(async ([rows]) => {
            return { status: 200, message: rows }
        })
        .catch(error => {
            return { status: 500, message: error }
        })

}

module.exports = {
    insertUser,
    fetchUser,
    fetchOneUser,
    fetchUserBy,
    updateUser,
    deleteUser
}