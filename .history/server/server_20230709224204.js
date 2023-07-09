// TRY STORING ALL IN AN AVL TREE INSTEAD MONGODB
// FOR NOW JUST CHECK NAME, ROOM AND REDIRECT USING JWT
// SAME NAME PROBLEM
// JWT PROBLEM
// PEOPLE ENTERING AFTER STARTING PROBLEM
// DELAY AFTER CLICKING START PROBLEM
// CORS PROBLEM
const jwt = require('jsonwebtoken');
const secretkey=''
const bodyParser = require('body-parser');
const express = require('express')
const http = require('http');
const fetch = require('node-fetch')
const { Buffer } = require('buffer');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 5000

const mongoose = require('mongoose');
const { log } = require('console');
const { type } = require('os');
mongoose.connect('mongodb://127.0.0.1:27017/fingersDB')
    .then(() => console.log('connected to db'))
    .catch(() => console.log('error connectiong'))

const RoomSchema = new mongoose.Schema({
    Id: {
        type: Number,
        unique: true,
        required: true,
    },
    Players: [
        {
            key: {
                type: String,
            },
            value: {
                type: String,
            }
        }
    ]
})

const RoomData = mongoose.model('RoomData', RoomSchema)

async function added(roomid, playerid, player) {
    try {
        let obj = await RoomData.findOne({ Id: roomid })
        if (obj !== null) {
            if (obj.Players.length < 5) {
                const newpair = { key: playerid, value: player };
                const result = await RoomData.updateOne(
                    { Id: roomid },
                    { $push: { Players: newpair } })

                return { exists: 'complete' }
            }
        }
        else {
            const newroomdata = new RoomData({ Id: roomid, Players: [{ key: playerid, value: player }] });
            await newroomdata.save()
            return { exists: 'created' }
        }
    }
    catch (err) {
        console.error("problem with added: ", err)
        return { exists: 'error' }
    }
}


async function removed(roomid, playerid) {
    try {
        const result = await RoomData.updateOne(
            { Id: roomid },
            { $pull: { Players: { key: playerid } } }
        );
        const newresult = await RoomData.findOne(
            { Id: roomid }
        )
        if (newresult.Players.length == 0) {
            const newerresult = await RoomData.deleteOne(
                { Id: roomid }
            )
        }
    } catch (error) {
        console.error('error in removed', error);
    }
}

app.post('/create', (req, res) => {
    RoomData.findOne({ Id: req.body.roomid })
        .then((obj) => {
            if (obj !== null) {
                res.send({ exists: 1 })
            }
            else {
                res.send({ exists: 0 })
            }
        })
        .catch(err => {
            console.error("error in create post ", err)
        })
})

app.post('/join', (req, res) => {
    RoomData.findOne({ Id: req.body.roomid })
        .then((obj) => {
            if (obj == null) {
                res.send({ exists: 1 })
            }
            else {
                if (obj.Players.length < 5) {
                    res.send({ exists: 2 })
                }
                else {
                    res.send({ exists: 0 })
                }
            }
        })
        .catch(err => {
            console.error("error in join post: ", err)
        })
})



app.get('/update/room=:roomId', (req, res) => {
    const roomId = req.params.roomId;
    RoomData.findOne({ Id: roomId })
        .then((obj) => {
            res.send({ players: obj.Players })
        })
        .catch(err => {
            console.error("error in update post ", err)
        })
});

// fetch('https://api.github.com/repos/Lakshyyaa/testingcsv/contents/words.csv')
//     .then(x => x.json())
//     .then(y => {
//         const encodedContent = y.content;
//         const decodedContent = Buffer.from(encodedContent, 'base64').toString('utf-8');
//         return (decodedContent.split('\n'));
//     })
//     .then(words => {
//         let y = [];
//         for (let i = 0; i < 2; i++) {
//             y.push((words[Math.floor(Math.random() * 1000)].slice(1, -1)).toLowerCase())
//         }
//         log(y)
//         log(typeof (y))
//         return y
//     })
   


io.on('connection', (socket) => {
    socket.on('add', ({ name, room }) => {
        added(room, socket.id, name)
            .then(x => {
                socket.join(room)
                let lol = Array.from(socket.rooms);
                let y = (lol[1])
                log(socket.id, ' joined the room ', y)
                io.to(room).emit('update')
            })
            .catch(err => {
                console.error("error in on adding ", err)
            })
        // log('hey the room is', y, ' name is ', name)
    })
    socket.on('progress', ({ name, progress }) => {
        let x = Array.from(socket.rooms);
        let y = (x[1])
        // log('hey the room is', y, ' name is ', name, ' progress is ', progress)
        io.to(y).emit('progressupdate', { name, progress })
    })
    socket.on('started', (room) => {
        // log('started in ', room, ' type is ', typeof (room))
        // make it fetch the words and the timerloop
        fetch('https://api.github.com/repos/Lakshyyaa/testingcsv/contents/words.csv')
            .then(x => x.json())
            .then(y => {
                const encodedContent = y.content;
                const decodedContent = Buffer.from(encodedContent, 'base64').toString('utf-8');
                return (decodedContent.split('\n'));
            })
            .then(words => {
                let y = [];
                for (let i = 0; i < 2; i++) {
                    y.push((words[Math.floor(Math.random() * 1000)].slice(1, -1)).toLowerCase())
                }
                log(y)
                log(typeof(y))
                return y
            })
            .then(y => {
                io.to(room).emit('startit', y)
            })

    })
    socket.on('disconnecting', () => {
        let x = Array.from(socket.rooms);
        let y = (x[1])
        removed(y, socket.id)
            .then(() => {
                io.to(y).emit('update')
                log(socket.id, ' left the room', y)
            })
            .catch(err => {
                console.error("error in on disconnecting ", err)
            })
    })
})

// const roomstuff = new RoomData({ Id: 5555, Players: [{ key: 89, value: 'laks' }] })
// roomstuff.save()

// async function joined(roomid, playerid, player) {
//     try {
//         let obj = await RoomData.findOne({ Id: roomid })
//         if (obj == null) {
//             return { exists: 'not' }
//         }
//         else if (obj.Players.length < 5) {
//             const newpair = { key: playerid, value: player };
//             const result = await RoomData.updateOne(
//                 { Id: roomid },
//                 { $push: { Players: newpair } })

//             return { exists: 'complete' }
//         }
//         else {
//             return { exists: 'full' };
//         }
//     }
//     catch (err) {
//         console.error("ERROR: " + err)
//         return { exists: 'error' }
//     }
// }


// async function created(roomid, playerid, player) {
//     try {
//         let obj = await RoomData.findOne({ Id: roomid })
//         if (obj !== null) {
//             return { exists: 'yes' }
//         }
//         else {
//             const newroomdata = new RoomData({ Id: roomid, Players: [{ key: playerid, value: player }] });
//             await newroomdata.save()
//             return { exists: 'created' }
//         }
//     }
//     catch (err) {
//         console.log('Error: ' + err)
//         return { exists: 'error' }
//     }
// }

server.listen(PORT, () => {
    console.log("Begin")
})
