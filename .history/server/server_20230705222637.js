// TRY STORING ALL IN AN AVL TREE INSTEAD MONGODB
// Make all Join/Create suit the db =>have an memberschange emmiter to change member display and db too
// => find out how each player gets same words, how only one can start for all, and a wpm/progress emitter
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
        type: [
            {
                key: {
                    type: String,
                },
                value: {
                    type: String,
                }
            }
        ]
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
                if (obj.Players.includes(req.body.name)) {
                    res.send({ exists: 2 })
                }
                else {
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

app.get('/roomdata/:x', (req, res) => {
    RoomData.findOne({ Id: req.params.x })
        .then((obj) => {
            res.send({ players: obj.Players })
        })
})

io.on('connection', (socket) => {
    socket.on('join', ({ roomid, playername }) => {
        log(playername + ' has joined the room ' + roomid)
        log('his playerid is: ' + socket.id)
    })
    socket.on('create', ({ roomid, playername }) => {
        log(playername + ' has created the room ' + roomid)
        log('his playerid is: ' + socket.id)
    })
    // socket.on('join', ({ name, room }, callback) => {
    //     const { error, user } = addUser({ id: socket.id, name, room })
    //     if (error) {
    //         return (callback(error))
    //     }
    //     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
    //     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })
    //     socket.join(user.room)
    //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom({ room: user.room }) })
    // })
    log(socket.id + ' joined')
    // socket.on('sendMessage', (message, callback) => {
    //     const user = getUser({ id: socket.id })
    //     io.to(user.room).emit('message', { user: user.name, text: message })
    //     callback()
    // })
    socket.on('disconnect', () => {
        // const user = removeUser(socket.id)
        // if (user) {
        //     io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!` })
        //     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom({ room: user.room }) })
        // }
        log(socket.id + ' left')
    })
})

server.listen(PORT, () => {
    console.log("Begin")
})
