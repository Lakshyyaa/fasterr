import React, { useEffect, useState } from "react";
import SocketFront from "./Socketfront";
import io from 'socket.io-client';
import styles from "./styles.css"
import { useLocation } from "react-router-dom";
let socket
function Multiplayer(props) {
    const ENDPOINT = ('http://localhost:5000');
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [members, setMembers] = useState([])
    // const [start, setStart] = useState(false)
    // const [timerText, setTimerText] = useState(5)
    // const [words, setWords] = useState('')
    // const [index, setIndex] = useState(0)
    // const [wordspm, setWordspm] = useState(0);
    // const [accuracy, setAccuracy] = useState(0)
    const [progress, setProgress] = useState([])
    const name = params.get('name')
    const room = params.get('room')
    function update() {
        fetch(`${ENDPOINT}/update/room=${room}`)
            .then(x => x.json())
            .then(y => {
                let arr = y.players.map(x => {
                    return ({ name: x, progress: 0 })
                })
                setMembers(arr)
                console.log(arr)
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
    // useEffect(() => {
    //     let progress=((props.index / props.words.length) * 100)
    //     socket.to(room).emit('progress', )
    // }, [props.words, props.index])
    return (
        <div>
            <div>
                {members.map(x=>{
                    return (<div><p key={x.name.key}>{x.name.value}</p>
                    )</div>
                })}
            </div>
        </div>
    )
}
export default Multiplayer