// WHY GET WORKED AND NOT POST
// WHY MAP WORKED NOT FOREACH IN UPDATEPROGRESS
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
    // const [progress, setProgress] = useState()
    let progress
    const name = params.get('name')
    const room = params.get('room')
    function update() {
        fetch(`${ENDPOINT}/update/room=${room}`)
            .then(x => x.json())
            .then(y => {
                let arr = y.players.map(x => {
                    return ({ name: x.value, progress: progress })
                })
                setMembers(arr)
                // console.log(arr)
            })
            .catch((error) => {
                console.error('Error in fetching:', error);
            })
    }
    function updateMembers(name, newprogress) {
        progress = newprogress
        setMembers(prev => {
            let ar = prev.map((x) => {
                if (x.name === name) {
                    x.progress = newprogress
                }
                return x;
            })
            return ar
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
    useEffect(() => {
        let newprogress = (((props.index / props.words.length) * 100))
        socket.emit('progress', { name: name, progress: newprogress })
        updateMembers(newprogress)
    }, [props.words, props.index])
    useEffect(() => {
        socket.on('startit', (wordsarray) => {
            props.countdown()
            props.setWords(wordsarray.join(' '))
        })
        socket.on('progressupdate', ({ name, progress }) => {
            updateMembers(name, progress)
        })
    }, [])

    useEffect(() => {
        if (props.startby1) {
            socket.emit('started', room)
        }
    }, [props.startby1])

    return (
        <div>
            <div>
                {
                    members.map((member, key) => {
                        return (<div key={key}>
                            <p className="membersdiv">{member.name}</p>
                            <p>{(member.progress)}</p>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
export default Multiplayer