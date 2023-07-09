// TRY STORING ALL IN AN AVL TREE INSTEAD MONGODB
// Make all Join/Create suit the db =>have an memberschange emmiter to change member display and db too
// => find out how each player gets same words, how only one can start for all, and a wpm/progress emitter
// ALL SOCKET EVENTS TO BE DONE AFTER REDIRECTING TO THE GAME!
// FOR NOW JUST CHECK NAME, ROOM AND REDIRECT USING JWT
// PROBLEM COULD BE SOCKET AND FETCH NOT IN SYNC
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
        // console.log(`${result.nModified} document(s) updated`);
    } catch (error) {
        console.error('error in removed', error);
    }
}

app.post('/create', (req, res) => {
    RoomData.findOne({ Id: req.body.roomid })
        .then((obj) => {
            // log(req.body.roomid)
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
            // log(req.body.roomid)
            if (obj == null) {
                res.send({ exists: 0 })
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
            // log('ok')
        })
        .catch(err => {
            console.error("error in update post ", err)
        })
});

io.on('connection', (socket) => {
    socket.on('add', ({ name, room }) => {
        added(room, socket.id, name)
            .then(x => {
                socket.join(room)
                io.to(room).emit('update')
            })
            .catch(err => {
                console.error("error in on adding ", err)
            })
        log(socket.id, ' is here')
    })

    socket.on('disconnecting', () => {
        let x = Array.from(socket.rooms);
        let y = (x[1])
        // log(socket.id, ' left the room', y)
        // log(typeof (socket.id))
        log(typeof (Pa(y))
        removed(parseInt(y), parseInt(socket.id))
            .then(() => {
                io.to(y).emit('update')
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
