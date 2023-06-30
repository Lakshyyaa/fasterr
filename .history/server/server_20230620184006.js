const { log } = require('console');
const express = require('express')
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/fingersDB')
    .then(() => console.log(90))
    .catch(() => console.log('error bc'))

const RoomSchema = new mongoose.Schema({ title: String, body: String })
const RoomData = mongoose.model('RoomData', RoomSchema)
const newbroomdata = new Blogitem({ title: x, body: y });
newblogitem.save();

app.get('/ok', (req, res) => {
    res.send({ crazy: 'lakshya' })
    console.log(12)
})

server.listen(PORT, () => {
    console.log("!@!@!@!@")
})
