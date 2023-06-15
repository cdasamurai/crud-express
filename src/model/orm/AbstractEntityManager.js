const connection = require("../db");

class AbstractEntityManager {

    EntityGenerator(entity, dataEntity) {
        Object.keys(dataEntity).forEach(item => { entity[item] = dataEntity[item] })

        return entity;
    }

    SqlQueryGenerator(tableName, entity, queryType) {

        let sql = '';
        let values = [];

        switch (queryType) {
            case 'insert':
                const columns = entity.getColumns().join(', ')
                const preparedValues = entity.getColumns().map(() => `?`).join(', ')

                entity.getColumns().forEach(item => {
                    values.push(entity[item])
                })

                sql = `INSERT INTO ${tableName} (${columns}) VALUES (${preparedValues})`;
                break;
            case 'update':
                const columnsAndPreparedValues = entity.getColumns().filter(item => entity[item] !== "").map(item => `${item} = ?`).join(', ')

                entity.getColumns().filter(item => entity[item] !== "").forEach(item => {
                    values.push(entity[item])
                })

                sql = `UPDATE ${tableName} SET ${columnsAndPreparedValues} WHERE id = ?`;
                break;
            case 'delete':
                sql = `DELETE FROM ${tableName} WHERE id = ?`;
                break;
            case 'select_all':
                const preparedColumns = entity.getColumns().filter(item => !entity.forbiddenColumns().includes(item)).join(', ')

                sql = `SELECT id, ${preparedColumns} FROM ${tableName}`;
                break;
            case 'select_by_id':
                sql = `SELECT * FROM ${tableName} WHERE id = ?`;
        }

        return { sql: sql, values: values }
    }

    async ExecuteInsert(sql, values, entity, tableName) {
        return connection.promise().query(sql, values)
            .then(async ([rows]) => {
                return connection.promise().query(`SELECT * FROM ${tableName} WHERE id = ?`, [rows.insertId])
                    .then(async ([rows]) => {
                        entity = this.EntityGenerator(entity, rows[0])

                        return { status: 201, message: entity }
                    })
            })
            .catch(error => {
                return { status: 500, message: error }
            })
    }

    async ExecuteUpdate(sql, values, entity, tableName) {
        return connection.promise().query(sql, [...values, entity.id])
            .then(async ([rows]) => {
                if (rows.affectedRows === 0) {
                    return { status: 404, message: {} }
                }
                return connection.promise().query(`SELECT * FROM ${tableName} WHERE id = ?`, [entity.id])
                    .then(async ([rows]) => {
                        entity = this.EntityGenerator(entity, rows[0])

                        return { status: 201, message: entity };
                    })
            })
            .catch(error => {
                return { status: 500, message: error }
            })
    }

    async ExecuteSelectAll(sql) {
        return connection.promise().query(sql)
            .then(async ([rows]) => {
                return { status: 200, message: rows };
            })
            .catch(error => {
                return { status: 500, message: error }
            })
    }

    async ExecuteSelectById(sql, entity) {
        return connection.promise().query(sql, [entity.id])
            .then(async ([rows]) => {
                if (rows.length === 0) {
                    return { status: 404, message: {} }
                }
                entity = this.EntityGenerator(entity, rows[0])
                return { status: 200, message: entity };
            })
            .catch(error => {
                return { status: 500, message: error }
            })
    }

    async ExecuteDelete(sql, entity) {
        return connection.promise().query(sql, [entity.id])
            .then(async ([rows]) => {
                return rows.affectedRows > 0 ? { status: 204, message: {} } : { status: 404, message: {} }
            })
            .catch(error => {
                return { status: 500, message: error }
            })
    }
}

module.exports = AbstractEntityManager;