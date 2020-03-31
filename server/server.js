const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');

// DB Setup
mongoose.connect(keys.MONGODB_URI);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// // Socket.io
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('User Disconnected');
//   });
//   socket.on('example_message', function(msg){
//     console.log('message: ' + msg);
//   });
// });
// io.listen(8000);

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server);
io.on('connection', client => {
    console.log('a user connected');
  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});
server.listen(port);
console.log('Server listening on:', port);