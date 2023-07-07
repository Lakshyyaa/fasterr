// A PLAYER MAY SIMPLY TYPE THE URL AND NOT BE A PART OF THE ROOM, check chat app
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import styles from "./styles.css"
const socket = io('http://localhost:5000');

function UserName() {
  const ENDPOINT = 'http://localhost:5000'
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  // ADDING EVENT LISTENERS
  useEffect(() => {
    socket.on('joined', x => {
      handlejoin(x);
    });
    socket.on('created', x => {
      handlecreate(x);
    });
  }, []);
  function handlejoin(x) {
    if (x.exists === 'complete') {
      setRoom(prev=>{
        window.location.href = `/game/${prev}`
        return prev;
      })
    }
    else if (x.exists === 'full') {
      alert('The room is full')
    }
    else if (x.exists === 'not') {
      alert('The room doesnt exist')
    }
    else {
      alert('error' + x.error)
      console.log(x.error)
    }
  }
  function handlecreate(x) {
    if(x.exists==='created')
    {
      setRoom(prev => {
        window.location.href = `/game/${prev}`
        return prev;
      })
    }
    else if(x.exists==='yes')
    {
      alert('Room exists')
    }
    else{
      alert("Error: "+x.error)
      console.error(x.)
    }
  }
  function Join(e) {
    e.preventDefault()
    if (room === '' || name === '') {
      alert("Please fill both the fields to join the room")
    }
    else {
      const pattern = /^\d{4}$/;
      if (pattern.test(room)) {
        const obj = {
          roomid: room,
          player: name
        }
        socket.emit('join', obj)
      }
      else {
        alert("make sure the room id is a 4-digit number")
      }
    }
  }
  function Create(e) {
    e.preventDefault()
    if (room === '' || name === '') {
      alert("Please fill both the fields to create a room")
    }
    else {
      const pattern = /^\d{4}$/;
      if (pattern.test(room)) {
        const obj = {
          roomid: room,
          player: name
        }
        socket.emit('create', obj)
        // fetch(ENDPOINT + `/create`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(obj)
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     if (data.exists) {
        //       console.log('room already exists');
        //     }
        //     else {
        //       // alert("The room doesn't exist")
        //       window.location.href = `/game/${room}`
        //       console.log(window.location)
        //     }
        //     console.log(data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
      }
      else {
        alert("make sure the room id is a 4-digit number")
      }
    }
  }
  return (
    <div className="usernamediv">
      <h1>WELCOME TO FINGERSS!</h1>
      <form className="form">
        <label id="formelement">
          <div className="inputname">
            <span className="name">Name: </span>
            <input
              type="text"
              name="name"
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="kimi no na wa"
              className="inpt"
            />
          </div>
        </label>
        <label id="formelement">
          <div className="roomid">
            <span className="room">Room ID: </span>
            <input
              type="text"
              name="room"
              onChange={e => setRoom(e.target.value)}
              value={room}
              placeholder="4 digit number"
              className="rinpt"
            />
          </div>
        </label>
        <div id="formelement">
          <button onClick={e => Create(e)} className="createbtn">
            Create Room
          </button>
        </div>
        <div id="formelement">
          <input
            className="sbmtbtn"
            type="submit"
            name="ok"
            value="JOIN ROOM"
            onClick={e => Join(e)}
          />
        </div>
      </form>
      <div>
        typewriter effect here
      </div>
    </div>
  )
}
export default UserName 