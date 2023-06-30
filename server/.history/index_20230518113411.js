const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


app.get('/', (req, res) => {
    res.send('<h1>lol</h1>');
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});