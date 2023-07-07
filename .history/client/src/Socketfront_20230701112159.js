import React, { useState, useEffect } from "react";
import Game from './Game'
import { useLocation, useParams } from "react-router-dom";
function SocketFront() {
    const ENDPOINT = 'http://localhost:5000'
    let location=useLocation()
    const [members, setMembers] = useState([])
    const { roomid } = useParams()
    useEffect(()=>{
        fetch(ENDPOINT+`/getroom/${roomid}`)
        .then(x=>log(x))
    },[members])
    return (
        <div>
            <Game />
            <div>
                <h1 style={{ padding: '2rem' }}>blank page bc</h1>
                {members.map((member,key) => {
                    return <p key={key}>{member}</p>
                })}
                <h1 style={{ padding: '2rem' }}>blank page bc</h1>
            </div>
        </div>
    )
}
export default SocketFront