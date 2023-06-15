const AbstractEntityManager = require('./AbstractEntityManager');

class EntityManager extends AbstractEntityManager {
    insert(entity, dataEntity, tableName) {
        super.EntityGenerator(entity, dataEntity);
        let {sql, values} = super.SqlQueryGenerator(tableName, entity, 'insert');

        return super.ExecuteInsert(sql, values, entity, tableName)
    }

    update(entity, dataEntity, id, tableName) {
        super.EntityGenerator(entity, dataEntity);
        let {sql, values} = super.SqlQueryGenerator(tableName, entity, 'update', id);

        return super.ExecuteUpdate(sql, values, entity, tableName)
    }

    delete(id, tableName) {
        let {sql, values} = super.SqlQueryGenerator(tableName, null, 'delete', id);

        return super.ExecuteDelete(sql, values)
    }
}

module.exports = EntityManager;