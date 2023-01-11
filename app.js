const express = require('express'); //import the express package 
const app = express(); // create an express app
const http = require('http'); // import the Node server packege
const server = http.createServer(app);// use our file with the server

// add in the Socket.io server stuff
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000; 

//this is a route handler -> listen for incoming request and send back a response
app.get('/', (req, res) => {
    //this is pointing at index.html -> shared team page 
  res.sendFile(__dirname + '/index.html');
});


// set up the server to listen for incoming connections at this part
server.listen(port, () => {
  console.log('listening on ${port}');
});



// sockei.io script goes here 
io.on('connection', (socket) => {
    console.log('chat user connected', socket);
  });

