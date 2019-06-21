const server = require('./server.js');
const request = require('supertest');

describe('GET /games', () => {
    it('responds with HTTP status code 200', async () => {
        const response = await request(server).get('/games')
        expect(response.status).toBe(200)
    });
    it('response.body returns an object', async () => {
        const response = await request(server).get('/games/');
        expect(typeof response.body).toBe('object');
    });
    it('should return an empty array when no games are in the database', async () => {
        const response = await request(server);
        expect(response.body).not.toBeDefined();
    });
});

describe('POST /games', () => {
    it('response.body returns an object', async () => {
        const response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade' })
        expect(typeof response.body).toBe('object')
    });
    it('responds with HTTP status code 422 when either a genre is not included', async () => {
        const response = await request(server).post('/games').send({ title: 'PacMan' })
        expect(response.status).toBe(422)
    });
    it('responds with HTTP status code 422 when either a title is not included', async () => {
        const response = await request(server).post('/games').send({ genre: 'Arcade' })
        expect(response.status).toBe(422)
    });
});