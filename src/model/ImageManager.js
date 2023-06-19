const connection = require('./db');

async function insertImage(data) {

    return connection.promise().query(`INSERT INTO image (filename) VALUES (?)`, data)
        .then(async ([rows]) => {
            return {status: 201, message: {id: rows.insertId, filename: data}}
        })
        .catch(error => {
            return {status: 500, message: error}
        })
}

async function fetchOneImage(id) {

    return connection.promise().query(`SELECT *  FROM image WHERE id = ?`, id)
        .then(async ([rows]) => {
            return {status: 200, message: rows[0]}
        })
        .catch(error => {
            return {status: 500, message: error}
        })

}

module.exports =
    {
        insertImage,
        fetchOneImage
    };