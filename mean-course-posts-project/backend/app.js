const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/node-angular-mean', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to Mongo DB.');
}).catch(() => {
    console.log('Connection to DB failed!');
});

const Post = require('../backend/model-schemas/post');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    post.save();
    res.status(201).json({ message: 'Post added succesfully.' });
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: "Sucessesfully fetched posts.",
            data: documents
        });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then( result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted !",
            data: result
        });
    });
});

module.exports = app;
