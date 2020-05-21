const express = require ('express');
const socketio =require('socket.io');
const http = require('http');

const {addUser,removeUser,getUser,getUserRoom} = require('./users');

const PORT =process.env.port || 5000;

const app = express();
const router = require('./router');

const server = http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {
    
    socket.on('join' , ({name,room}, callback) => {
        
        const {error,user}=addUser({id:socket.id,name,room});

        if(error) return callback(error);

        

        socket.join(user.room);
        
    })

    socket.on('disconnect', () => {
     console.log('User left');   
    })
});


app.use(router);

server.listen(PORT, () => console.log(`server started ${PORT}`));