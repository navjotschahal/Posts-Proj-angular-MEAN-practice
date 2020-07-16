const express = require('express');
const bCrypt = require('bcrypt');

const User = require('../model-schemas/post');


const { query } = require('express');
const app = require('../app');

const router = express.Router();

router.post('/signUp', (req, res, next) => {
    bCrypt.hash(req.body.password, 100).then( hash => {
        const user = new User({
            userName: req.body.userName,
            password: hash
        });
        user.save().then( result => {
            res.status(201).json({
                data: result,
                message: 'User created!'
            });
        }).catch( err => {
            res.status(500).json({
                data: err,
                message: 'User not created!'
            });
        });
    });
});

module.exports = router;