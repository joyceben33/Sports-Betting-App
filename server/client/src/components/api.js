import openSocket from 'socket.io-client';
import { get } from 'mongoose';
const  socket = openSocket('http://localhost:5000');

export function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

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
  socket.emit('subscribeToPlayLog', 100)
}

// export function endGame(cb){
//   socket.on('endGame', cb(null))
//   socket.emit('endGame')
// }