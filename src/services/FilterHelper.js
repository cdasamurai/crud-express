function searchFilterGenerator (filter) {
    let like = '';
    for (const index in keys = Object.keys(filter)) {
        like += `${keys[index]} LIKE ? ${keys.length !== Number(index) + 1 ? 'OR ' : ''}`
    }

    return {sql: `SELECT * FROM user WHERE ${like}`, values: Object.values(filter).map(item => `%${item}%`)}
}

function byTokenGenerator (token) {
    return {sql: `SELECT * FROM user WHERE password_token = ? AND password_token_expiration > NOW()`, values: [token]}
}

function checkKindOfFilter(filter) {
    switch(false) { 
        case !filter.search: return searchFilterGenerator(filter.search);
        break;
        case !filter.token: return byTokenGenerator(filter.token);
        break;
    }
}

module.exports = {
    checkKindOfFilter
}