import React, { useEffect } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
import io from 'socket.io-client';
import styles from "./styles.css"
let socket

function Multiplayer()
{
    const ENDPOINT = ('http://localhost:5000');
    const urll=new url

    return(
        <div>
            <MainGame/>
            <SocketFront />
        </div>  
    )
}
export default Multiplayer