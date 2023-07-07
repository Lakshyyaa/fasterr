import React, { useState, useEffect } from "react";
import Game from './Game'
import { useLocation } from "react-router-dom";
const ENDPOINT = 'http://localhost:5000'
function SocketFront() {
    let history=useLocation()
    const [members, setMembers] = useState([])
    useEffect(()=>{
        
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