const connection = require("../db");

class AbstractEntityManager {

    EntityGenerator(entity, dataEntity) {
        Object.keys(dataEntity).forEach(item => { entity[item] = dataEntity[item]})

        return entity;
    }

    SqlQueryGenerator(tableName, entity, queryType) {
        const columns = entity.getColumns().join(', ')
        const preparedValues = entity.getColumns().map(() => `?`).join(', ')

        let values = [];

        entity.getColumns().forEach(item => {
            values.push(entity[item])
        })

        let sql = '';

        switch (queryType) {
            case 'insert': sql = `INSERT INTO ${tableName} (${columns}) VALUES (${preparedValues})`;
            break;
            case 'update': sql = `UPDATE ${tableName} SET ${columns} WHERE id = ?`;
                break;
            case 'delete': sql = `DELETE FROM ${tableName} WHERE id = ?`;
                break;
            case 'select_all': sql = `SELECT * FROM ${tableName}`;
                break;
            case 'select_by_id': sql = `SELECT * FROM ${tableName} WHERE id = ?`;
        }

        return {sql: sql, values: values}
    }

    async ExecuteInsert(sql, values, entity, tableName) {
        return connection.promise().query(sql, values)
            .then(async ([rows]) => {
                return connection.promise().query(`SELECT * FROM ${tableName} WHERE id = ?`, [rows.insertId])
                    .then(async ([rows]) => {
                        let newEntity = this.EntityGenerator(entity, rows[0])

                        return {status: 201, message: newEntity}
                    })
            })
            .catch(error => {
                return {status: 500, message: error}
            })
    }

}

module.exports = AbstractEntityManager;