'use strict';
const path = process.cwd();
const MailHandler = require(path + '/app/controllers/emailHandler.server.js');

module.exports = (app, db) => {

    app.route('/')
        .get((req, res) => {
            console.log('hitting /');
            // if (req.headers['x-https'] == '1') {
            res.render('home', {title: 'Noble Aesthetic | Home'}, (err, html)=>{
                res.send(html);
            });
            // } else {
            //     res.redirect(301, 'https://www.nobleaesthetic.com' + req.url);
            // }
        });
    // .post((req, res) => {
    //     var mailHandler = new MailHandler(req, res);
    //     mailHandler.sendMessage();
    //     res.writeHead(200);
    //     res.end();
    // });

    app.route('/aboutLydia')
        .get((req, res) => {
            // if (req.headers['x-https'] == 1) {
            res.render('aboutLydia', {
                title: 'Noble Aesthetic | About Lydia'
            });
            // } else {
            // res.redirect(301, 'https://www.nobleaesthetic.com' + req.url);
            // }
        });
    // .post((req, res) => {
    //     var mailHandler = new MailHandler(req, res);
    //     mailHandler.sendMessage();
    //     res.writeHead(200);
    //     res.end();
    // });

    app.route('/aboutColleen')
        .get((req, res) => {
            // if (req.headers['x-https'] == 1) {
            res.render('aboutColleen', {
                title: 'Noble Aesthetic | About Colleen'
            });
            // } else {
            //     res.redirect(301, 'https://www.nobleaesthetic.com' + req.url);
            // }
        });
    // .post((req, res) => {
    //     var mailHandler = new MailHandler(req, res);
    //     mailHandler.sendMessage();
    //     res.writeHead(200);
    //     res.end();
    // });

    app.get('*', (req, res) => {
        console.log('hitting the 404 route');
        res.sendStatus(404);
        res.end();
    });
}; //end of module.exports