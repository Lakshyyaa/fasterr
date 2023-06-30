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
    .catch(() => console.log('error connectiong'))

const RoomSchema = new mongoose.Schema({
    Id: {
        type: Number,
        unique: true,
        required: true,
    },
    player1: String,
    player2: String,
    player3: String,
    player4: String,
    player5: String,
    Count: Number
})

const RoomData = mongoose.model('RoomData', RoomSchema)
// const newroomdata = new RoomData({ Id: 2212, player2: 'ws' });
// newroomdata.save();

app.get('/rooms/:roomid', (req, res) => {
    res.send({ crazy: 'lakshya' })
    Room
})

server.listen(PORT, () => {
    console.log("Begin")
})
