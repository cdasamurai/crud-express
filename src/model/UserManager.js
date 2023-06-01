const connection = require('./db');
const filterHelper = require('../services/FilterHelper');
const {passwordHasher} = require('../services/PasswordHelper');
const User = require('../entity/User');

async function insertUser(data) {
    const sql = "INSERT INTO user (first_name, last_name, username, address, birthdate, password, email) VALUES (?, ?, ?, ?, ?, ?, ?)";

    //password hashing
    data.password = await passwordHasher(data.password)

    let bodyResponse = {...data};
    
    return connection.promise().query(sql, Object.values(data))
    .then(async ([rows]) => { 
        bodyResponse.id = rows.insertId
        //@TODO remove password from body
        
        return {status: 201, message: bodyResponse}
    })
    .catch(error => {
        return {status: 500, message: error}
    })
}

async function updateUser(id, data) {
    let sqlQuery = "UPDATE user SET ";

    for (let key in itemValue = Object.keys(data)) {
        sqlQuery += `${itemValue[key]} = ?, `
    }

    sqlQuery = sqlQuery.slice(0, sqlQuery.length - 2);

    sqlQuery += ` WHERE id = ${id}`;

    let bodyResponse = {...data};
    
    return connection.promise().query(sqlQuery, Object.values(data))
    .then(async ([rows]) => { 
        //bodyResponse.id = rows.insertId
        //@TODO remove password from body

        return {status: 201, message: bodyResponse}
    })
    .catch(error => {
        return {status: 500, message: error}
    })
}

async function deleteUser(id) {
    let sqlQuery = `DELETE FROM user where id = ${id}`;
    
    return connection.promise().query(sqlQuery)
    .then(async ([rows]) => { 

        return {status: 200, message: {}}
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
        let user = new User();
        Object.keys(rows[0]).map(item => { user[item] = rows[0][item] });
        
        return rows.length === 0 ? {status: 404, message: {}} : {status: 200, message: user}
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
    fetchUserBy,
    updateUser,
    deleteUser
}