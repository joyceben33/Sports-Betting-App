const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Game = require('./models/Game')
const bodyParser = require('body-parser')
const Counter = require('./models/counters')

// DB Setup
// mongoose.connect(keys.MONGODB_URI);
mongoose.connect('mongodb://localhost/bettingApp')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

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

io.on('connection', socket => {
    console.log('a user connected');
    
    // just like on the client side, we have a socket.on method that takes a callback function
    socket.on('change color', (color) => {
        // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
        // we make use of the socket.emit method again with the argument given to use from the callback function above
        console.log('Color Changed to: ', color)
        io.sockets.emit('change color', color)
    })

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
        console.log("user disconnected");
      });
});





app.get("/Game", (req, res, next) => {
    let id = req.body.gameID

    Game
        .find({})
        .exec((err, play) => {
            
           
            res.send(play)

        })

})
server.listen(port);
console.log('Server listening on:', port);