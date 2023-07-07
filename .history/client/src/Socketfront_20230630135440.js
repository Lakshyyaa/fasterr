import React, { useState, useEffect } from "react";
import Game from './Game'
function SocketFront() {
    const [members, setMembers] = useState(['lol', 'laksha'])
    return (
        <div>
            <Game />
            <div>
                <h1 style={{ padding: '2rem' }}>blank page bc</h1>
                {members.map(member,key) => {
                    return <p key={key}>{member}</p>
                })}
                <h1 style={{ padding: '2rem' }}>blank page bc</h1>
            </div>
        </div>
    )
}
export default SocketFront