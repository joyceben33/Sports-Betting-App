const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = express.Router();
dotenv.config()
const app = express();


//Import Schemas from models folder
const Game = require('./models/game');
const Play = require('./models/play');
const Team = require('./models/team');





// 'mongodb://localhost:27017/bettingApp'
// MONGOOSE CONNECT
// ===========================================================================
 const connect = mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/bettingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (() => console.log('MonogDB connected...')).catch(err => console.log(err))


//Data parsing

app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(router);





// Server Setup
// ===========================================================================
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require('socket.io')(server);







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
    connect.then(db => {
        try{
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
                        Play.findOne({
                            playId: "004011615814"
                        }).exec((err, firstPlay) => {
                            currentId = firstPlay['playId'];
                            socket.emit('getNextPlay', firstPlay)
                        })
                    } else {
                        Play.find({
                            playId: {
                                $gt: currentId
                            }
                        }).sort({
                            playId: 1
                        }).limit(1).exec((err, nextPlay) => {
        
                            currentId = nextPlay[0] ? nextPlay[0]['playId'] : null
                            if (!currentId) {
                                return clearInterval(playLogInterval)
                            }
                            socket.emit('getNextPlay', nextPlay)
        
                        })
                    }
        
                }, timeInterval)
        
            })
        }
        catch (error) {
            console.error(error);
        }
    })
    
});


//HTTP Request Logger
app.use(morgan('tiny'));

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
    console.log("+++User Express Server with Socket Running!!!")
});