const express = require ('express');
const socketio =require('socket.io');
const http = require('http');

const PORT =process.env.port || 5000;

const app = express();
const router = require('./router');

const server = http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {
    console.log('New Connection');

    socket.on('disconnect', () => {
     console.log('User left');   
    })
});


app.use(router);

server.listen(PORT, () => console.log(`server started ${PORT}`));