import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import { useLocation } from "react-router-dom";
let socket
function Multiplayer(props) {
    const ENDPOINT = ('http://localhost:5000');
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const [members, setMembers] = useState([])
    let progress
    const name = params.get('name')
    const room = params.get('room')
    function update() {
        fetch(`${ENDPOINT}/update/room=${room}`)
            .then(x => x.json())
            .then(y => {
                let extra = 0;
                y.players.forEach((x) => {
                    if (x.value === name) {
                        extra = 1
                    }
                })
                if (extra === 0) {
                    alert('game full!')
                    window.history.back()
                }
                setMembers(prev => {
                    if (y.players.length > prev.length) {
                        let arr = y.players.map(x => {
                            let pro = progress
                            prev.forEach((e) => {
                                if (e.name === x.value) {
                                    pro = e.progress
                                }
                            })
                            return ({ name: x.value, progress: pro })
                        })
                        return arr
                    }
                    else {
                        let arr = []
                        y.players.forEach(element => {
                            let y;
                            prev.forEach(x => {
                                if (x.name === element.value) {
                                    y = (x.progress)
                                    return y
                                }
                            });
                            arr.push({ name: element.value, progress: y })
                        });
                        return (arr)
                    }
                })
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
        socket.emit('check', ({ room: room, name: name }))
        socket.on('checked', (x) => {
            if (x.check) {
                if (name === x.name) {
                    alert("game running")
                    window.history.back()
                }
            }
        })
        console.log("added called with", name, room)
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
        if (!isNaN(newprogress)) {
            newprogress = newprogress.toFixed(2)
            updateMembers(name, newprogress)
        }
        socket.emit('progress', { name: name, progress: newprogress })
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
            props.setStart(true)
        }
    }, [props.startby1])

    return (
        <div>
            <div className="outprogress">
                {
                    members.map((member, key) => {
                        return (<div key={key} className="inprogress">
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