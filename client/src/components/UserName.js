import React, { useState } from "react";
import TypeWriter from "./TypeWriter";

function UserName() {
  const ENDPOINT = 'http://localhost:5000'
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
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
        fetch(ENDPOINT + '/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        })
          .then(x => x.json())
          .then(y => {
            if (y.exists === 0) {
              alert('full room')
            }
            else if (y.exists === 1) {
              alert('does not exist')
            }
            else if (y.exists === 3) {
              alert('name taken')
            }
            else if (y.exists === 2) {
              window.location.href = `/game/?room=${room}&name=${name}`
            }
          })
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
        fetch(ENDPOINT + '/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        })
          .then(x => x.json())
          .then(y => {
            if (y.exists === 1) {
              alert("room exists")
            }
            else if (y.exists === 0) {
              window.location.href = `/game/?room=${room}&name=${name}`
            }
            else {
              console.error('error')
            }
          })
      }
      else {
        alert("make sure the room id is a 4-digit number")
      }
    }
  }
  return (
    <div className="usernamediv">
      <h1 className="h1">WELCOME TO Fasterr!</h1>
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
          <button onClick={e => Join(e)} className="sbmtbtn">
            Join Room
          </button>
        </div>
      </form>
      <div className="typewriter-text">
        <TypeWriter/>
      </div>
     </div>
  )
}
export default UserName 