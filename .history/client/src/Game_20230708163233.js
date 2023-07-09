// MAKE SURE ALL WORDS ARE SMALL AS SHIFT+LETTER WILL WASTE THE WORDS
import React, { useState, useEffect, useRef } from "react";
import Multiplayer from "./Multiplayer";
function MainGame(props) {
    const [start, setStart] = useState(false)
    const [timerText, setTimerText] = useState(5)
    const [words, setWords] = useState('')
    const [index, setIndex] = useState(0)
    const [wordspm, setWordspm] = useState(0);
    const [accuracy, setAccuracy] = useState(0)
    const countdowndiv = useRef(null)
    const maindiv = useRef(null)
    const wordsdiv = useRef(null)
    const wordsRef = useRef(words)
    let boolStart = false
    let keyStrokes = 0
    let startTime = 0
    useEffect(() => {
        wordsRef.current = words
    }, [words])
    useEffect(() => {   
        document.addEventListener('keydown', (e) => handlekey(e))
    }, [])
    function countdown() {
        setStart(true)
        countdowndiv.current.style.display = 'block'
        maindiv.current.style.opacity = '0.2'
        timerLoop(3)
        fetch('https://api.github.com/repos/Lakshyyaa/testingcsv/contents/words.csv')
            .then(x => x.json())
            .then(y => (atob(y.content)).split('\n'))
            .then(words => {
                let y = [];
                for (let i = 0; i < 2; i++) {
                    const x = Math.floor(Math.random() * 1000);
                    y.push(words[x].substring(1, words[x].length - 1));
                }
                return y;
            })
            .then(y => {
                setWords(y.join(' '))
            })
    }
    function handlekey(e) {
        let typed = e.key
        if (boolStart) {
            setIndex(prev => {
                if (typed === wordsRef.current[prev]) {
                    prev = prev + 1
                }
                keyStrokes++
                let time = ((Date.now() - startTime) / 1000) / 60;
                setWordspm(((prev / 5) / time).toFixed(1))
                setAccuracy(((prev / keyStrokes) * 100).toFixed(1))
                if (wordsRef.current.split('').length === prev) {
                    boolStart = false
                    alert("done....")
                }
                return prev;
            })
        }
    }
    function timerLoop(i) {
        if (i > 0) {
            setTimerText(i)
            setTimeout(() => {
                i--
                timerLoop(i)
            }, 1000)
        }
        else if (i === 0) {
            countdowndiv.current.style.display = 'none'
            maindiv.current.style.opacity = '1'
            boolStart = true
            startTime = Date.now()
        }
    }
    return (
        <div>
            <div className="countdown" ref={countdowndiv}>
                Begins in: {timerText}
            </div>
            <div ref={maindiv}>
                <h1>How fast do you type?</h1>
                <div ref={wordsdiv} className="wordsdivv">
                    {words.split('').map((char, key) => {
                        let color;
                        if (key < index) {
                            color = 'green'
                        }
                        else if (key === index) {
                            color = 'red'
                        }
                        else {
                            color = 'black'
                        }
                        return (
                            <span
                                key={key}
                                style={{ color: color }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>
                <button onClick={() => countdown()} disabled={start}>Start</button>
                <h1>WPM: {wordspm}</h1>
                <h1>Accuracy: {accuracy}%</h1>
            </div>
            <Multiplayer/>
        </div>
    )
}
export default MainGame;


