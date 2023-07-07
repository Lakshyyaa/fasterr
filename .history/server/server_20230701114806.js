// TRY STORING ALL IN AN AVL TREE INSTEAD MONGODB
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

app.post('/join', (req, res) => {
    RoomData.findOne({ Id: req.body.room })
        .then((obj) => {
            if (obj == null) {
                res.send({ exists: 0 })
            }
            else if (obj.Players.length < 5) {
                const filter = { Id: obj.Id };
                let arr = obj.Players
                arr.push(req.body.name)
                const update = { Players: arr };
                RoomData.findOneAndUpdate(filter, update, { new: true })
                    .then(x => log(x))
                    .then(() => {
                        res.send({ exists: 1 })
                    })
            }
        })
})

app.post('/create', (req, res) => {
    RoomData.findOne({ Id: req.body.room })
        .then((obj) => {
            if (obj !== null) {
                res.send({ exists: 1 })
            }
            else {
                const newroomdata = new RoomData({ Id: req.body.room, Players: [req.body.name] });
                newroomdata.save()
                res.send({ exists: 0 })
            }
        })
})

app.get('/roomdata/:x',(req,res)=>{
    console.log(req)
    // RoomData.findOne({ Id: x })
    // .then(obj=>log(obj))
    // res.send({x:1})
})

io.on('connection', (socket) => {
    console.log('New User Joined!');
    socket.on('disconnect', () => {
        log('he left well')
    })
})

server.listen(PORT, () => {
    console.log("Begin")
})
