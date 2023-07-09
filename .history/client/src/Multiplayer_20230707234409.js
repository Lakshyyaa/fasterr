import React, { useEffect } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront"; 
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client';
import styles from "./styles.css"
let socket
function Multiplayer() {
    const ENDPOINT = ('http://localhost:5000');
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const name=params.get('name')
    const room=params.get('room') 
    function update(obj)
    {
        fetch(ENDPOINT+'/update',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(obj)
        })
        .then(x=>x.json())
        .then(y=>)
    }
    useEffect(() => {
        let socket = io(ENDPOINT)
        socket.on('byebyebye', (x) => {
            console.log(212121)
        })
        return (() => {
            socket.off()
        })
    }, [ENDPOINT ,location.search])
    return (
        <div>
            <MainGame />
            <SocketFront />
        </div>
    )
}
export default Multiplayer