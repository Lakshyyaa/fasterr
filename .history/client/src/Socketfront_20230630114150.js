import React, { useState, useEffect } from "react";
function SocketFront() {
    const location = useLocation()
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });
    }, [ENDPOINT, location.search])
    return (
        <div>
            <h1>lols boi</h1>
        </div>
    )
}
export default SocketFront