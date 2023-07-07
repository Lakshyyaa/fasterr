import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
function SocketFront() {
    const ENDPOINT = 'http://localhost:5000'
    let location = useLocation()
    const [members, setMembers] = useState([])
    const { roomid } = useParams()
    useEffect(() => {
        console.log(roomid)
        fetch(ENDPOINT + `/roomdata/${roomid}`)
            .then(x => (x.json()))
            .then(x => setMembers(x.players))
    }, [])
    return (
        <div>
            <div>
                <h1 style={{ padding: '2rem' }}>blank page bc</h1>
                {members.map((member, key) => {
                    return <p key={key}>{member}</p>
                })}
                <h1 style={{ padding: '2rem' }}>blank page bc</h1>
            </div>
        </div>
    )
}
export default SocketFront