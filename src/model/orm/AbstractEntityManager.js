const connection = require("../db");

class AbstractEntityManager {
  EntityGenerator(entity, dataEntity) {
    Object.keys(dataEntity).forEach((item) => {
      entity[item] = dataEntity[item];
    });

    return entity;
  }

  SqlQueryGenerator(tableName, entity, queryType, id) {
    const columns = entity.getColumns ? entity.getColumns().join(", ") : entity;

    const preparedValues = entity.getColumns
      ? entity
          .getColumns()
          .map(() => `?`)
          .join(", ")
      : entity;

    const formattedEntity = Object.entries(entity)
      .map(([key, value]) => `${key}="${value}"`)
      .join(", ");

    console.log(formattedEntity);

    let values = [];

    entity.getColumns
      ? entity.getColumns().forEach((item) => {
          values.push(entity[item]);
        })
      : values.push(entity);

    let sql = "";

    switch (queryType) {
      case "insert":
        sql = `INSERT INTO ${tableName} (${columns}) VALUES (${preparedValues})`;
        break;
      case "update":
        sql = `UPDATE ${tableName} SET ${formattedEntity} WHERE id = ${id}`;
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

    return { sql: sql, values: values, id: id };
  }

  async ExecuteInsert(sql, values, entity, tableName, id) {
    return connection
      .promise()
      .query(sql, values)
      .then(async ([rows]) => {
        console.log(rows);
        return connection
          .promise()
          .query(
            `SELECT * FROM ${tableName} WHERE id = ${
              rows.insertId !== 0 ? rows.insertId : id
            }`
          )
          .then(async ([rows]) => {
            let newEntity = this.EntityGenerator(entity, rows[0]);

            return { status: 201, message: newEntity };
          });
      })
      .catch((error) => {
        return { status: 500, message: error };
      });
  }
}

module.exports = AbstractEntityManager;
