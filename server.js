const express = require('express');
const helmet = require('helmet');

const db = require('./data/dbConfig.js')

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/games', (req, res) => {
    const message500 = { message: 'An error has occuried.' };

    return db('games')
        .then(games => { res.status(200).json(games) })
        .catch(error => { res.status(500).json(message500) });
});

server.post('/games', async (req, res) => {
    const { title, genre, release_year } = req.body;
    const message405 = { message: 'Game already in database' };
    const message422 = { message: 'Missing title and or genre.' };
    const message500 = { message: 'An error occuried while attempting to post to the database.' };

    if (!title || !genre) {
        res.status(422).json(message422)
    }
    try {
        const Title = await db('games-update').select('title')
        if (Title.includes(title)) {
            res.status(405).json(message405);
        } else {
            const response = await db('games-update').insert({ title, genre, release_year });
            res.status(201).json(response);
        }
    } catch (error) {
        res.status(500).json(message500);
    }
});


module.exports = server;