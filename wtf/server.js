'use strict';
require('dotenv').config();
const express = require('express');
const routes = require('./app/routes/index.js');
const mongo = require('mongodb').MongoClient();
const bodyParser = require('body-parser');

const app = express();
const path = process.cwd();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', './public/views');
app.set('view engine', 'pug');
app.set('port', (process.env.PORT || 61334));

app.use(express.static('public'));

routes(app);

app.listen(app.get('port'), function (err) {
    if(err){
        console.error(err);
    }
    console.log('Node app is running on port', app.get('port'));
});