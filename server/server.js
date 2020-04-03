const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Play = require('./models/play');

const app = express();

// Add Models below

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// MONGOOSE CONNECT
// ===========================================================================
// mongoose.connect(keys.MONGODB_URI);
mongoose.connect('mongodb://localhost/bettingApp')

const db = mongoose.connection
db.on('error', ()=> {console.log( '---User FAILED to connect to mongoose')})
db.once('open', () => {
	console.log( '+++User connected to mongoose')
})



    


// Server Setup
// ===========================================================================
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server);
server.listen(port, () => {console.log("+++User Express Server with Socket Running!!!")});

/***************************************************************************************** */
/* Conditions for production														   */
/***************************************************************************************** */
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

  



/***************************************************************************************** */
/* Socket logic starts here																   */
/***************************************************************************************** */
const connections = [];
io.on('connection', socket => {
    console.log(`A user connected with the id: ${socket.id}`);
    connections.push(socket)

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
        console.log(`Disconnected id: ${socket.id}`);
    });

    let game = null;

    socket.on('subscribe_game_status', () => {
        socket.emit('game_status', gameStatus)
    })
    

    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          socket.emit('timer', new Date());
        }, interval);
    });
    


    socket.on('startGame', (timeInterval) => {
        console.log(`client is subscribing to plays being sent every ${timeInterval/1000} seconds`);
        //start the game
         game = setInterval(() => {
            io.sockets.emit('playByPlay', getPlay())
        , timeInterval})


        //write function
        function getPlay() {
            return( 
            app.get("/Game", (req, res, next) => {
                Game
                    .findOne({})
                    .exec((err, play) => {
                        res.send(play)

                    })

            }))
        }

    })



   
});






