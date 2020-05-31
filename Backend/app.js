const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// connecting to mongodb database testRepo1 and server listening to PORT 3000
mongoose.connect('mongodb://localhost:27017/testRepo1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000);
        console.log('Connected to database');
    })
    .catch(err => {
        console.log('Connection failed ' + err);
    });

// parse application/json
app.use(bodyParser.json());

// parse application x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// statically loading images
app.use('/images', express.static(path.join('backend/images')));

// CORS implementation
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});


// add Routes below