const bodyParser = require('body-parser');
const express = require('express')
const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 5000

const mongoose = require('mongoose');
const { log } = require('console');
mongoose.connect('mongodb://127.0.0.1:27017/fingersDB')
    .then(() => console.log('connected to db'))
    .catch(() => console.log('error connectiong'))

const RoomSchema = new mongoose.Schema({
    Id: {
        type: Number,
        unique: true,
        required: true,
    },
    Players: {
        type: [String]
    }
})

const RoomData = mongoose.model('RoomData', RoomSchema)
const newroomdata = new RoomData({ Id: 2102, Pla: 'ws' });

app.post('/join', (req, res) => {
    RoomData.findOne({ Id: req.body.room })
        .then((obj) => {
            if (obj == null) {
                log('room does not exist')
                res.send({ exists: 1 })
            }
            else {
                // check number of people in room too
                res.send({ exists: 0 })
            }
        })
})
app.post('/create', (req, res) => {
    RoomData.findOne({ Id: req.body.room })
        .then((obj) => {
            if (obj !== null) {
                log('room exists')
                res.send({ exists: 1 })
            }
            else {
                res.send({ exists: 0 })
            }
        })
})


server.listen(PORT, () => {
    console.log("Begin")
})
