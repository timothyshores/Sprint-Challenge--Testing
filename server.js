const express = require('express');
const helmet = require('helmet');

const db = require('./data/dbConfig.js')

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/games', (req, res) => {
    const message500 = { message: 'An error has occuried.' }

    return db('games')
        .then(games => {
            res.status(200).json(games);
        })
        .catch(error => {
            res
                .status(500)
                .json(message500);
        });
})


module.exports = server;