const db = require('../data/dbConfig.js');
const Games = require('./games-model.js');

describe('games-model', () => {
    afterEach(async () => {
        await db('games').truncate();
    });

    describe('get', () => {
        it('should return a 200 HTTP reponse ', async () => {
            const res = await Games.get('/');
            expect(res.status).toBe(200);
        });
    });

    describe('insert()', () => {
        it('should insert a new game with title and genre', async () => {
            let game = await Games.insert({ title: 'Pacman', genre: 'Arcade' });
            expect(game).toEqual({ id: 1, title: 'Pacman', genre: 'Arcade' });
        });
    });
});