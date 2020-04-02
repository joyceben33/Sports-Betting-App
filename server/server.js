const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Game = require('./models/Game')
const bodyParser = require('body-parser')

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



// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log('a user connected');
    // //emit sends
    // client.emit('message',  {message: "hey1"})
    // client.emit('message',  {message: "hey2"})
    // client.emit('message',  {message: "hey3"})

    // // There is a method to figure out how many clients are connected to to the socket
    // let clients = 4;
    // // This sends a message to all the clients 
    // io.sockets.emit('message', {message: `There are ${clients} connected.`})

    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
    });



    // disconnect is fired when a client leaves the server
    client.on("disconnect", () => {
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