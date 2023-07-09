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
    const [members, setMembers] = useState([])
    const name = params.get('name')
    const room = params.get('room')
    function update() {
        const obj = { room: room }
        fetch(ENDPOINT + '/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then(x => x.json())
            .then(y => setMembers(y))
    }
    useEffect(() => {
        socket = io(ENDPOINT)
        console.log(6969)
        socket.emit('create', { name, room })
        return (() => {
            socket.off()
        })
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('update', () => {
            console.log('updating')
            update()
        })
        return (() => {
            socket.off()
        })
    }, [ENDPOINT, location.search])

    return (
        <div>
            {
                members.map(index, member)
            }
            <MainGame />
            <SocketFront />
        </div>
    )
}
export default Multiplayer