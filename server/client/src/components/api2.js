import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');
// callBack
function getGameStatus(callBack) {
    socket.on('game_status',gameStatus => callBack(null, gameStatus))
    socket.emit('subscribe_game_status')
    // socket.emit('startGame', (10000, ));
    // socket.on('timer', timestamp => callBack(null, timestamp));
   
}
export { getGameStatus };