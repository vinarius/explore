const express = require('express');
const port = 8080;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Docker World!');
});

app.listen(port, (error) => {
    if(error) throw new error(error);
    console.log('Server listening on port:', port);
});