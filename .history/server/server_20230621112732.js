const { log } = require('console');
const express = require('express')
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/fingersDB')
    .then(() => console.log('connected to db'))
    .catch(() => console.log('error connectiong to db'))

const RoomSchema = new mongoose.Schema({
    Id: Number,
    player1: String,
    player2: String,
    player3: String,
    player4: String,
    player5: String,
    Count: Number
})

const RoomData = mongoose.model('RoomData', RoomSchema)
const newroomdata = new RoomData({ Id: 2222, player1: 'ws' });
newroomdata.save();

app.get('/ok', (req, res) => {
    res.send({ crazy: 'lakshya' })
    console.log(12)
})

server.listen(PORT, () => {
    console.log("Begin")
})
