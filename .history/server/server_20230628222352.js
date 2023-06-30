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
// const newroomdata = new RoomData({ Id: 2102, player2: 'ws' });

app.post('/join', (req, res) => {
    RoomData.findOne({ Id: req.body.room })
        .then((obj) => {
            if(obj._id!=null)
            {
                if (obj != null) {
                    res.send({ found: 1 })
                }
                else {
                    res.send({ found: 0 })
                }
            }
        })
})
app.post('/create', (req, res) => {
    RoomData.exists({ Id: req.body.room })
        .then((obj) => {
            if (obj != null) {
                res.send({ found: 1 })
            }
            else {
                res.send({ found: 0 })
            }
        })
})


server.listen(PORT, () => {
    console.log("Begin")
})
