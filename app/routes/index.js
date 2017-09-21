const express = require('express');
const app = express();
const path = process.cwd();

module.exports = function (app) {
    app.route('/')
        .get((req, res) => {
            res.sendFile(path + '/public/index.html');
        });
};