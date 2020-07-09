const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts-routes');

mongoose.connect('mongodb://localhost:27017/node-angular-mean', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to Mongo DB.');
}).catch(() => {
    console.log('Connection to DB failed!');
});

const Post = require('../backend/model-schemas/post');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images/photos', express.static(path.join('backend/images/photos')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use("/api/posts/", postsRoutes);

module.exports = app;
