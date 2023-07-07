import React, { useState, useEffect } from "react";
import Game from './Game'
function SocketFront() {
    const [members, setMembers] = useState([])
    return (
        <div>
            <Game /> 
            <div>

            </div>
        </div>
    )
}
export default SocketFront