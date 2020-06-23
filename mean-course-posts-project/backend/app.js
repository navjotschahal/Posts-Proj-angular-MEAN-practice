const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const posts = req.body;
    console.log(posts);
    res.status(201).json({ message: 'Post added succesfully.' });
});

app.use('/api/posts', (req, res, next) => {
    const posts = require('../src/assets/json/post-list/post-list.json');
    res.status(200).send(posts)
});

module.exports = app;
