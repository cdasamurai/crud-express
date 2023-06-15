const AbstractEntityManager = require('./AbstractEntityManager');

class EntityManager extends AbstractEntityManager {
    insert(entity, dataEntity, tableName) {
        let entityToInsert = super.EntityGenerator(entity, dataEntity);
        let {sql, values} = super.SqlQueryGenerator(tableName, entityToInsert, 'insert');

        return super.ExecuteInsert(sql, values, entity, tableName)
    }

    update(entity, dataEntity, tableName, id) {
        let entityToUpdate = super.EntityGenerator(entity, dataEntity);
        let {sql, values} = super.SqlQueryGenerator(tableName, entityToUpdate, 'update', id);

        return super.ExecuteUpdate(sql, values, entity, tableName)
    }

    delete(entity, id, tableName) {
        let entityToDelete = super.EntityGenerator(entity, dataEntity);
        let {sql, values} = super.SqlQueryGenerator(tableName, entityToDelete, 'delete', id);

        return super.ExecuteInsert(sql, values, entity, tableName)
    }
}

module.exports = EntityManager;