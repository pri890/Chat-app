const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);  //passing express app as a request handler
const socketio = require('socket.io');
const io = socketio(server);  //http server is now converted into socket protocol
const path = require('path');


app.use('/',express.static(path.join(__dirname,'public')));

const users = {}  //for each user we're mapping the ID of the user with the name of the user

//CONNECTION IS THE EVENT, whenever client will connect , this event will get fired up
io.on('connection', (socket) => {  //socket of that particular client

    console.log(`Connection Established with --> ${socket.id}`);

    //as soon as socket gets any msg from server, we'll listen to that ---> here EVENT IS SEND-MSG
    socket.on('send-msg', (data) => {   //data which is being sent to the server
         
        //if we write socket.emit here...an event is fired up and we're sending a reply back to the client from the same pipeline. If we'll write io.emit(io contains all the sockets) then a msg sent by client 1 is recieved to client 2,3 and 4 also. EG- GROUP CHATTING
        io.emit('received-msg', {   //here we are sending a msg to the client that server has received the msg
            msg:data.msg,
            user: users[socket.id]
        })
    });

    socket.on('login', (data) => {
        users[socket.id] = data.user;  //here we are forming key, value pair. 
    });
    
})


server.listen(3000, () => {
    console.log('server listening at port 3000');
})