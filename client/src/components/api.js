import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3000');



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

