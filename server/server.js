const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const fetch = require("node-fetch");
const { Buffer } = require("buffer");
const cors = require("cors");
const app = express();
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"], 
    credentials: true, 
  },
});

const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
const { log } = require("console");
mongoose
  .connect("mongodb://127.0.0.1:27017/fingersDB")
  .then(() => console.log("connected to db"))
  .catch(() => console.log("error connecting"));

const RoomSchema = new mongoose.Schema({
  Id: {
    type: Number,
    unique: true,
    required: true,
  },
  Players: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
});

const RoomData = mongoose.model("RoomData", RoomSchema);

async function added(roomid, playerid, player) {
  try {
    let obj = await RoomData.findOne({ Id: roomid });
    if (obj !== null) {
      if (obj.Players.length < 5) {
        const newpair = { key: playerid, value: player };
        await RoomData.updateOne(
          { Id: roomid },
          { $push: { Players: newpair } }
        );
        return { exists: "complete" };
      }
    } else {
      const newroomdata = new RoomData({
        Id: roomid,
        Players: [{ key: playerid, value: player }],
      });
      await newroomdata.save();
      return { exists: "created" };
    }
  } catch (err) {
    console.error("problem with added: ", err);
    return { exists: "error" };
  }
}

async function removed(roomid, playerid) {
  try {
    await RoomData.updateOne(
      { Id: roomid },
      { $pull: { Players: { key: playerid } } }
    );
    const newresult = await RoomData.findOne({ Id: roomid });
    if (newresult.Players.length == 0) {
      await RoomData.deleteOne({ Id: roomid });
      running = running.filter((element) => element !== roomid);
    }
  } catch (error) {
    console.error("error in removed", error);
  }
}

app.post("/create", (req, res) => {
  RoomData.findOne({ Id: req.body.roomid })
    .then((obj) => {
      if (obj !== null) {
        res.send({ exists: 1 });
      } else {
        res.send({ exists: 0 });
      }
    })
    .catch((err) => {
      console.error("error in create post ", err);
    });
});

app.post("/join", (req, res) => {
  RoomData.findOne({ Id: req.body.roomid })
    .then((obj) => {
      if (obj == null) {
        res.send({ exists: 1 });
      } else {
        if (obj.Players.length < 5) {
          const playerExists = obj.Players.some(
            (x) => x.value === req.body.player
          );
          if (playerExists) {
            res.send({ exists: 3 });
          } else {
            res.send({ exists: 2 });
          }
        } else {
          res.send({ exists: 0 });
        }
      }
    })
    .catch((err) => {
      console.error("error in join post: ", err);
    });
});

app.get("/update/room=:roomId", (req, res) => {
  const roomId = req.params.roomId;
  RoomData.findOne({ Id: roomId })
    .then((obj) => {
      res.send({ players: obj.Players });
    })
    .catch((err) => {
      console.error("error in update post ", err);
    });
});

let running = [];

io.on("connection", (socket) => {
  socket.on("add", ({ name, room }) => {
    added(room, socket.id, name)
      .then(() => {
        socket.join(room);
        io.to(room).emit("update");
      })
      .catch((err) => {
        console.error("error in on adding ", err);
      });
  });

  socket.on("progress", ({ name, progress }) => {
    const rooms = Array.from(socket.rooms);
    const room = rooms[1];
    io.to(room).emit("progressupdate", { name, progress });
  });

  socket.on("started", (room) => {
    fetch(
      "https://api.github.com/repos/Lakshyyaa/testingcsv/contents/words.csv"
    )
      .then((response) => response.json())
      .then((data) => {
        const encodedContent = data.content;
        const decodedContent = Buffer.from(encodedContent, "base64").toString(
          "utf-8"
        );
        return decodedContent.split("\n");
      })
      .then((words) => {
        const selectedWords = Array.from({ length: 18 }, () =>
          words[Math.floor(Math.random() * 1000)].slice(1, -1).toLowerCase()
        );
        io.to(room).emit("startit", selectedWords);
        running.push(room);
      });
  });

  socket.on("disconnecting", () => {
    const rooms = Array.from(socket.rooms);
    const room = rooms[1];
    removed(room, socket.id)
      .then(() => {
        io.to(room).emit("update");
      })
      .catch((err) => {
        console.error("error in on disconnecting ", err);
      });
  });

  socket.on("check", ({ room, name }) => {
    const isRunning = running.includes(room);
    socket.emit("checked", { check: isRunning ? 1 : 0, name });
  });
});

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
