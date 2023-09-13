const connection = require('./db');
const filterHelper = require('../services/FilterHelper');
const {passwordHasher} = require('../services/PasswordHelper');
const User = require('../entity/User');
const NotificationPushService = require('../services/NotificationPushService');
const EmailSenderService = require('../services/EmailSenderService');

async function insertUser(data) {
    const sql = "INSERT INTO user (first_name, last_name, username, address, birthdate, password, email, expo_push_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //password hashing
    data.password = await passwordHasher(data.password)

    let bodyResponse = {...data};
    
    return connection.promise().query(sql, Object.values(data))
    .then(async ([rows]) => { 
        bodyResponse.id = rows.insertId;
        NotificationPushService("REGISTRATION", {expo_push_token: data.expo_push_token});
        EmailSenderService("REGISTRATION", {email: data.email, fullName: data.first_name + ' ' + data.last_name});

        return {status: 201, message: bodyResponse}
    })
    .catch(error => {
        return {status: 500, message: error}
    })
}

async function updateUser(id, data, isPasswordReset) {
    if (isPasswordReset) {
        data.password = await passwordHasher(data.password);
        data.password_token = "";
    }

    let sqlQuery = "UPDATE user SET ";

    for (let key in itemValue = Object.keys(data)) {
        sqlQuery += `${itemValue[key]} = ?, `
    }

    sqlQuery = sqlQuery.slice(0, sqlQuery.length - 2);

    sqlQuery += ` WHERE id = ${id}`;

    let bodyResponse = {...data};
    
    return connection.promise().query(sqlQuery, Object.values(data))
    .then(async ([rows]) => { 

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
        let userResult = rows[0];
        /*user.id = userResult.id;
        user.firstName = userResult.first_name;
        user.lastName = userResult.last_name;
        user.username = userResult.username;
        user.address = userResult.address;
        user.birthdate = userResult.birthdate;*/

        Object.keys(rows[0]).map(item => { user[item] = rows[0][item] });
        //return console.log(user);
        
        return rows.length === 0 ? {status: 404, message: {}} : {status: 200, message: user}
    })
    .catch(error => {
        return {status: 500, message: error}
    })
}

async function fetchUserBy(res, filter) {
    let {sql, values } = filterHelper.checkKindOfFilter(filter);
    if ((filter.token) && filter.token === "") {
        return res.status(400).json("Something went wrong")
    }

    return connection.promise().query(sql,values)
    .then(async ([rows]) => {

        if (rows.length === 0) {
            return res.status(400).json("Something went wrong");
        }

        return {status: 200, message: rows}
    })
    .catch(error => {
        return res.status(500).message(error)
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