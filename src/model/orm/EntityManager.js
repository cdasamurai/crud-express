const AbstractEntityManager = require("./AbstractEntityManager");

class EntityManager extends AbstractEntityManager {
  insert(entity, dataEntity, tableName) {
    let entityToInsert = super.EntityGenerator(entity, dataEntity);
    let { sql, values } = super.SqlQueryGenerator(
      tableName,
      entityToInsert,
      "insert"
    );

    return super.ExecuteInsert(sql, values, entity, tableName);
  }
  update(entity, dataEntity, tableName, id) {
    let entityToInsert = super.EntityGenerator(entity, dataEntity);
    let { sql, values } = super.SqlQueryGenerator(
      tableName,
      entityToInsert,
      "update"
    );

    return super.ExecuteInsert(sql, values, entity, tableName);
  }
}

module.exports = EntityManager;
