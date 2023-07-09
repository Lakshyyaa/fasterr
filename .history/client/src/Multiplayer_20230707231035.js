import React, { useEffect } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront"; 
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client';
import styles from "./styles.css"
const ENDPOINT = ('http://localhost:5000');
let socket
function Multiplayer() {
    const location = useLocation()
    useEffect(() => {
        let socket = io(ENDPOINT)
        socket.emit('roomput')
        socket.on('byebyebye', (x) => {
            console.log(212121)
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