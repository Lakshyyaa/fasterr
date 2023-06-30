import io from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
    console.log('Connected to the server');
});

// Handle the 'disconnect' event
socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
    