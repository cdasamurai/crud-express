const AbstractEntityManager = require('./AbstractEntityManager');

class EntityManager extends AbstractEntityManager {
    insert(entity, dataEntity, tableName) {
        entity = super.EntityGenerator(entity, dataEntity);
        let { sql, values } = super.SqlQueryGenerator(tableName, entity, 'insert');

        return super.ExecuteInsert(sql, values, entity, tableName)
    }

    fetchAll(entity, tableName) {
        let { sql } = super.SqlQueryGenerator(tableName, entity, 'select_all');

        return super.ExecuteSelectAll(sql)
    }

    fetchOne(entity, dataEntity, tableName) {
        entity = super.EntityGenerator(entity, dataEntity);
        let { sql } = super.SqlQueryGenerator(tableName, entity, 'select_by_id');

        return super.ExecuteSelectById(sql, entity)
    }

    update(entity, dataEntity, tableName) {
        entity = super.EntityGenerator(entity, dataEntity);
        let { sql , values } = super.SqlQueryGenerator(tableName, entity, 'update');

        return super.ExecuteUpdate(sql, values, entity, tableName)
    }

    delete(entity, dataEntity, tableName) {
        entity = super.EntityGenerator(entity, dataEntity);
        let { sql } = super.SqlQueryGenerator(tableName, entity, 'delete');

        return super.ExecuteDelete(sql, entity)
    }
}

module.exports = EntityManager;