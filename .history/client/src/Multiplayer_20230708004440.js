import React, { useEffect } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
import io from 'socket.io-client';
import styles from "./styles.css"
const ENDPOINT=('http://localhost:5000');
let socket

function Multiplayer()
{
    function update(obj) {
        fetch(ENDPOINT + '/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then(x => x.json())
            .then(y => {

            })
    }
    useEffect(()=>{
        socket=io(ENDPOINT)
        
        return(()=>{
            socket.off()
        })
    },[])
    return(
        <div>
            <MainGame/>
            <SocketFront />
        </div>  
    )
}
export default Multiplayer