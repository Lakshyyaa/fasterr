import React, { useEffect, useState } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
import io from 'socket.io-client';
import styles from "./styles.css"
import { useLocation } from "react-router-dom";
let socket

function Multiplayer() {
    const ENDPOINT = ('http://localhost:5000');
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [member, setMembers] = useState([])
    const name = params.get('name')
    const room = params.get('room')
    function update() {
        // fetch(ENDPOINT + '/update', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ room: room })
        // })
        //     .then(x => x.json())
        //     .then(y => console.log(y))
    }
    useEffect(() => {
        socket = io(ENDPOINT)
        console.log()
        socket.emit('join', { name, room })
        return (() => {
            socket.off()
        })
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('update', () => {
            update()
        })
        return (() => {
            socket.off()
        })
    }, [ENDPOINT, location.search])

    return (
        <div>
            <MainGame />
            <SocketFront />
        </div>
    )
}
export default Multiplayer