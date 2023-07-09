import React, { useEffect, useState } from "react";
import MainGame from "./Game";
import SocketFront from "./Socketfront";
import io from 'socket.io-client';
import styles from "./styles.css"
import { useLocation } from "react-router-dom";
let socket
function Multiplayer() {
    const ENDPOINT = ('http://localhost:5000');
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [members, setMembers] = useState([])
    const [lol, setLol] = useState(1)
    // const [start, setStart] = useState(false)
    // const [timerText, setTimerText] = useState(5)
    // const [words, setWords] = useState('')
    // const [index, setIndex] = useState(0)
    // const [wordspm, setWordspm] = useState(0);
    // const [accuracy, setAccuracy] = useState(0)
    const name = params.get('name')
    const room = params.get('room')
    function update() {
        fetch(`${ENDPOINT}/update/room=${room}`)
            .then(x => x.json())
            .then(y => {
                setMembers(y.players)
            })
            .catch((error) => {
                console.error('Error in fetching:', error);
            })
    }
    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('add', { name, room })
        socket.on('update', () => {
            update()
        })
        return (() => {
            socket.off()
        })
    }, [location.search])
    useEffect(()=>{
        console.log(lol)
    })
    return (
        <div>
            <MainGame lol={lol} setLol={setLol} />
            <div>
                {members.map((member, _id) => (
                    <p key={_id}>{member.value}</p>
                ))}
            </div>
        </div>
    )
}
export default Multiplayer