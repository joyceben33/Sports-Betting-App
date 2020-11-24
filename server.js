const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
// const cors = require('cors');
// const router = require('./router');
const app = express();


//Import Schemas from models folder
const Game = require('./models/game');
const Play = require('./models/play');
const Team = require('./models/team');




// Add Models below



// app.use(index);


// MONGOOSE CONNECT
// ===========================================================================
// mongoose.connect(keys.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bettingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', () => {
    console.log('---User FAILED to connect to mongoose')
})
db.once('open', () => {
    console.log('+++User connected to mongoose')
})


//Data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



/***************************************************************************************** */
/* Conditions for production														   */
/***************************************************************************************** */
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build/'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// Server Setup
// ===========================================================================
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server);

// app.use(cors());




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
                console.log("---Game GET failed!!")
            } else {
                console.log(game)
                socket.emit('getGameStatus', game)
                console.log("+++Game GET worked!!")
            }
        })


    })

    socket.on('getTeams', () => {
        Team.find({}).exec((err, teams) => {
            if (err) {
                console.log("---TEAM GET failed!!")
            } else {
                console.log(teams)
                socket.emit('getTeams', teams)
                console.log("+++TEAM GET worked!!")
            }
        })
    })
    
    let playLogInterval;
    let currentId = null
    socket.on('subscribeToPlayLog', (timeInterval) => {
       playLogInterval = setInterval(() => {
        if (!currentId) {
            Play.findOne({playId: "004011615814"}).exec((err, firstPlay) => {
                currentId = firstPlay['playId'];
                socket.emit('getNextPlay', firstPlay)
            })
        } else{
           Play.find({playId: {$gt: currentId}}).sort({playId: 1}).limit(1).exec((err, nextPlay) => {
              
               currentId = nextPlay[0] ? nextPlay[0]['playId'] : null
               if(!currentId){
                return clearInterval(playLogInterval)
            }
               socket.emit('getNextPlay', nextPlay)

           })
        }

       }, timeInterval)
     
    })

});

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
    console.log("+++User Express Server with Socket Running!!!")
});