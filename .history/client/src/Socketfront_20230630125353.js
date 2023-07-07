import React, { useState, useEffect } from "react";
import Game from './Game'
function SocketFront() {
    const [members, setMembers] = useState([])
    return (
        <div>
            <Game />
            <div>
                {members.forEach(member => {
                    <p>member</p>
                })}
                <h1 style={{ padding: '3rem' }}>blank page bc</h1>
            </div>
        </div>
    )
}
export default SocketFront