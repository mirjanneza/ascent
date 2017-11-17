const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const keys = require('../config/config.js').keys;
const url = keys.mongoURI;

var db;
MongoClient.connect(url, function(err, database) {
    if (err) {
        console.log('Fail to connect', err);
    }
    else {
        db = database;
    }
});

//Rendering the page
router.get('/', function(req, res, next) {
    res.render('keyGenerator');
});

router.post('/', function(req, res) {
    const keysDB = db.collection('keys');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const level = req.body.level;
    const school = req.body.school;
    
    console.log(req.body);
    console.log(req.body.keyCount);
    
    var keys = [];
    for (var count = 0; count < req.body.keyCount; count++) {
        var singleKey = '';
        for (var charAmt = 0; charAmt < 10; charAmt++) {
            singleKey = singleKey + characters.charAt(Math.floor(Math.random() * characters.length));
        }
        keys.push({key: singleKey, level: level, school: school});
    }
    keysDB.insert(keys, function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('../');
});

module.exports = router;