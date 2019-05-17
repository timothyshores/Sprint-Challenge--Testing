const db = require('../data/dbConfig');

module.exports = {
    insert,
};

async function insert(game) {
    const [id] = await db('games-update').insert(game, 'id');
    return db('games-update')
        .where({ id })
        .first();
}