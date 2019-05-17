const express = require('express');
const helmet = require('helmet');

const games = require('../games/games-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/games', async (req, res) => {
    const rows = await games.getAll();

    res.status(200).json(rows);
});

module.exports = server;