

// socket.on('connect', () => {
//     console.log('Connected to the server');
// });

// socket.on('disconnect', () => {
//     console.log('Disconnected from the server');
// });
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import io from 'socket.io-client'

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