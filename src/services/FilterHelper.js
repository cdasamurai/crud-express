function searchFilterGenerator (filter) {
    let like = '';
    for (const index in keys = Object.keys(filter)) {
        like += `${keys[index]} LIKE ? ${keys.length !== Number(index) + 1 ? 'OR ' : ''}`
    }

    return {sql: `SELECT * FROM user WHERE ${like}`, values: Object.values(filter).map(item => `%${item}%`)}
}

function checkKindOfFilter(filter) {
    switch(false) { 
        case !filter.search: return searchFilterGenerator(filter.search);
        break;
    }
}

module.exports = {
    checkKindOfFilter
}