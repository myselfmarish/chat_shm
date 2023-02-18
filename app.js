const express = require('express'); //import the express package 
const app = express(); // create an express app
const http = require('http'); // import the Node server packege
const server = http.createServer(app);// use our file with the server

// add in the Socket.io server stuff
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000; 

app.use(express.static('public'));

//this is a route handler -> listen for incoming request and send back a response
app.get('/', (req, res) => {
    //this is pointing at index.html -> shared team page 
  res.sendFile(__dirname + '/views/index.html');
});


// set up the server to listen for incoming connections at this part
server.listen(port, () => {
  console.log('listening on ${port}');
  
});

//created array that holds a list of users
let connectedUsers = [];

// socket.io script goes here 
io.on('connection', (socket) => {
    console.log('chat user connected:');
    connectedUsers.push({id:socket.id,name:'anonymous'});
    socket.emit('connected', {sID: socket.id, message:'new connection',connectedUsers:connectedUsers})

    io.emit('update_users',{message:'User connected',connectedUsers:connectedUsers});
// step1 - receive incoming messages
    socket.on ('chat_message', function(msg) {
      console.log(msg); // have a look at message data

      // step 2
      // rebroadcast the current message to everyone connected to our chat service
      // it gets sent to all users, including the original message creator
      

      io.emit ('new_message', { id: socket.id, message: msg });


    })

    socket.on('nickname_event',function (obj){
        console.log(obj);
        let updateUser = connectedUsers.find(user => user.id === obj.id);
        if (updateUser){
            updateUser.name=obj.name;
            io.emit('update_users',{message:'Nickname updated', connectedUsers:connectedUsers})
        }
    });

    socket.on('typing_event', function(user) {

      io.emit('typing', user);
    })
    socket.on('disconnect', function (){
        console.log('user disconnected');
        connectedUsers = connectedUsers.filter(usr=> usr.id !== socket.id);
        io.emit('update_users',{message: 'User disconnected',connectedUsers:connectedUsers})
    })
  });


