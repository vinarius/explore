'use strict';
const nodemailer = require('nodemailer');

function mailHandler(req, res) {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_DESTINATION_USER,
        subject: 'Hello, from ' + req.body.userMessageName,
        text: 'Email: ' + req.body.userMessageEmail + '\n\n' + req.body.userMessageComment
    };

    this.sendMessage = function () {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = mailHandler;