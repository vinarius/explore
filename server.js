const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./app/routes/index.js');
const path = process.cwd();
const mongo = require('mongodb').MongoClient();

mongo.connect('mongodb://vin:Romans623@ds139954.mlab.com:39954/vin-bacon', (err, db) => {

    if(err){
        throw new Error("Error connecting to DB");
    } else {
        console.log("\nMONGO NOICE on port 27017\n");
    }

    app.use('/public', express.static(path + '/public'));
    app.use('/css', express.static(path + '/public/css'));

    routes(app);

    app.listen(3000, () => {
        console.log("\nNOICE, listening on 3000\n");
    });

});

//work on connecting to DB