const { log } = require('console');
const express = require('express')
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000
app.get('/',(req, res)=>{
    res.send('<h1>ossssssk</h1>')
})
server.listen(PORT,()=>{
    console.log("!@!@!@!@")
})