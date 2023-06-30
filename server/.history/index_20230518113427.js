const express = require('express')
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = require('./router')
const { getUser, getUsersInRoom, addUser, removeUser } = require('./users')
app.use(router)
const PORT = process.env.PORT || 5000