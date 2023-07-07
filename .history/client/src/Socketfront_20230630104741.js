// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); 

// socket.on('connect', () => {
//     console.log('Connected to the server');
// });

// socket.on('disconnect', () => {
//     console.log('Disconnected from the server');
// });
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import io from 'socket.io-client'
let socket;

function SocketFront() {
    const location = useLocation()
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {

    }, [ENDPOINT, location.search])
   
    useEffect(() => {
        socket.on('roomData', (x) => {
            // console.log(x.users);
            // console.log('list of users up: ');
            setUsers(x.users)
        })
    }, [users])
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}
export default Chat