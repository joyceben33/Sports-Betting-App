import io from 'socket.io-client';
let socket 
const ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://nba-betting-app-server.herokuapp.com/' : 'http://localhost:5000';
socket = io(ENDPOINT);



export function getGameStatus(cb){
  socket.on('getGameStatus',gameStatus => cb(null, gameStatus))
  socket.emit('getGameStatus')
}

export function getTeams(cb){
  socket.on('getTeams',teams=> cb(null, teams))
  socket.emit('getTeams')
}

export function getNextPlay(cb){
  socket.on('getNextPlay', play => cb(null, play))
}
export function startGame(){
  socket.emit('subscribeToPlayLog', 2500)
}

