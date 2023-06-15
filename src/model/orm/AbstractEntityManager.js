const connection = require("../db");

class AbstractEntityManager {
  EntityGenerator(entity, dataEntity) {

    Object.keys(dataEntity).forEach((item) => {
      entity[item] = dataEntity[item];
    });

    return entity;
  }

  #getColumnsValues = (entity) => {
    let values = [];

    entity.getColumns().forEach((item) => {
      if (entity[item])
        values.push(entity[item]);
    });

    return values;
  }

  SqlQueryGenerator(tableName, entity, queryType, id) {

    let sql = "";
    let values = [];

    switch (queryType) {
      case "insert":
        const insertColumns = entity.getColumns().join(", ");
        const preparedValues = entity
          .getColumns()
          .map(() => `?`)
          .join(", ");
          values = getColumnsValues(entity);

        sql = `INSERT INTO ${tableName} (${insertColumns}) VALUES (${preparedValues})`;
        break;

      case "update":
        const updateColumns = entity.getColumns().map((col) => `${col} = ?`).join(", ");
        values = getColumnsValues(entity);

        sql = `UPDATE ${tableName} SET ${updateColumns} WHERE id = ${id}`;
        break;

      case "delete":
        sql = `DELETE FROM ${tableName} WHERE id = ${id}`;
        break;

      case "select_all":
        sql = `SELECT * FROM ${tableName}`;
        break;

      case "select_by_id":
        sql = `SELECT * FROM ${tableName} WHERE id = ${id}`;
    }

    return { sql: sql, values: values };
  }

  async ExecuteInsert(sql, values, entity, tableName) {
    return connection
      .promise()
      .query(sql, values)
      .then(async ([rows]) => {
        return connection
          .promise()
          .query(`SELECT * FROM ${tableName} WHERE id = ?`, [rows.insertId])
          .then(async ([rows]) => {
            let newEntity = this.EntityGenerator(entity, rows[0]);

            return { status: 201, message: newEntity };
          });
      })
      .catch((error) => {
        console.log(error);
        return { status: 500, message: error };
      });
  }

  async ExecuteUpdate(sql, values, entity, tableName) {
    return connection
      .promise()
      .query(sql, values)
      .then(async ([rows]) => {
        if (rows.affectedRows > 0) {
          return connection
          .promise()
          .query(`SELECT * FROM ${tableName} WHERE id = ?`, [entity.id])
          .then(async ([rows]) => {
            let newEntity = this.EntityGenerator(entity, rows[0]);
            
            return { status: 200, message: newEntity };
          });
        }
        else {
          return { status: 404, message: "Not Found" };
        }
      })
      .catch((error) => {
        console.log(error);
        return { status: 500, message: error };
      });
  }

  async ExecuteDelete(sql, values) {
    console.log(sql)
    return connection
      .promise()
      .query(sql, values)
      .then(async ([rows]) => {
        if (rows.affectedRows > 0)
          return { status: 200 };
        else
          return { status: 404, message: "Not Found" };

      })
      .catch((error) => {
        console.log(error);
        return { status: 500, message: error };
      });
  }
}

module.exports = AbstractEntityManager;
