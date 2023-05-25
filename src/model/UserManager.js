const connection = require('./db');
const filterHelper = require('../services/FilterHelper');

async function insertUser(data) {
    const sql = "INSERT INTO user (first_name, last_name, username, address, birthdate, password) VALUES (?, ?, ?, ?, ?, ?)";
    let bodyResponse = {...data};
    
    return connection.promise().query(sql, Object.values(data))
    .then(async ([rows]) => { 
        bodyResponse.id = rows.insertId

        return {status: 201, message: bodyResponse}
    })
    .catch(error => {
        return {status: 500, message: error}
    })
}

async function fetchUser() {
    const sql = "SELECT * FROM user";
    
    return connection.promise().query(sql)
    .then(async ([rows]) => { 
        return {status: 200, message: rows}
    })
    .catch(error => {
        return {status: 500, message: error}
    })
}

async function fetchOneUser(id) {
    const sql = "SELECT * FROM user WHERE id = ?";
    
    return connection.promise().query(sql, id)
    .then(async ([rows]) => { 
        return {status: 200, message: rows[0]}
    })
    .catch(error => {
        return {status: 500, message: error}
    })
}

async function fetchUserBy(filter) {
    //search filter (that contain)
    let {sql, values } = filterHelper.checkKindOfFilter(filter);
    //order filter (sorting)

    //date filter 

    return connection.promise().query(sql,values)
    .then(async ([rows]) => { 
        return {status: 200, message: rows}
    })
    .catch(error => {
        return {status: 500, message: error}
    })

}

module.exports = {
    insertUser,
    fetchUser,
    fetchOneUser,
    fetchUserBy
}