


import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import io from 'socket.io-client'
const socket = io('http://localhost:5000'); 


function SocketFront() {
    const location = useLocation()
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {

    }, [ENDPOINT, location.search])

    return (
        <div>
            <h1>lols boi</h1>
        </div>
    )
}
export default SocketFront