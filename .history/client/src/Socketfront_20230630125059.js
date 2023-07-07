import React, { useState, useEffect } from "react";
import Game from './Game'
function SocketFront() {
    const [members, setMembers] = useState([])
    return (
        <div>
            {members.forEach(member => {
                <p>member</p>
            })}
            <h1>blank page bc</h1>
        </div>
    )
}
export default SocketFront