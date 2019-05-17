const db = require('../data/dbConfig');

module.exports = {
    insert,
};

async function insert(game) {
    const [id] = await db('games').insert(game, 'id');
    return db('games')
        .where({ id })
        .first();
}