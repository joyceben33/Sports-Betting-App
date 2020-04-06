const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
// const keys = require('./config/keys');
const app = express();
const index = require('./routes/index');
//Import Schemas from models folder
const Game = require('./models/game');
const Play = require('./models/play');
const Team = require('./models/team');
const Bet = require('./models/bet');



// Add Models below

//Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// app.use(index);


// MONGOOSE CONNECT
// ===========================================================================
// mongoose.connect(keys.MONGODB_URI);
mongoose.connect('mongodb://localhost:27017/bettingApp')

const db = mongoose.connection
db.on('error', () => {
    console.log('---User FAILED to connect to mongoose')
})
db.once('open', () => {
    console.log('+++User connected to mongoose')
})






// Server Setup
// ===========================================================================
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server);
server.listen(port, () => {
    console.log("+++User Express Server with Socket Running!!!")
});

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


// app.get('/', (req, res) => {
//     Game
//         .findOne({
//             "gameId": "401161581"
//         })
//         .exec((err, game) => {
//             res.send(game)
//         })
// })


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

    //Sending out initial game status to clients connected to the socket
    //Note hard coded game id because there is just one game in the database
    socket.on('getGameStatus', () => {
        console.log('emiteed')

        Game.findOne({
            "gameId": "401161581"
        }).exec((err, game) => {
            if (err) {
                console.log("---USER GET failed!!")
            } else {
                console.log(game)
                socket.emit('getGameStatus', game)
                console.log("+++USER GET worked!!")
            }
        })


    })

    socket.on('getTeams', () => {
        Team.find({}).exec((err, teams) => {
            if (err) {
                console.log("---USER GET failed!!")
            } else {
                console.log(teams)
                socket.emit('getTeams', teams)
                console.log("+++USER GET worked!!")
            }
        })
    })

    socket.on('getPlays', () => {
        Play.find({}).exec((err, plays) => {
            if (err) {
                console.log("---USER GET failed!!")
            } else {
                // console.log(plays)
                // setInterval(() => {
                //     for(i = 0; i < plays.length; i++) {
                //         socket.emit('sendPlays', plays[i])
                //         console.log("+++USER GET worked!!")
                //     }
                // }, timeInterval)
                socket.emit('getPlays', plays)


            }
        })
    })





    socket.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            socket.emit('timer', new Date());
        }, interval);
    });








});