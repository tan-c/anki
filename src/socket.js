import openSocket from 'socket.io-client';
import config from '@ROOT/config/app';

const { BASE_URL } = config;
const socket = openSocket(BASE_URL);

// function subscribeToTimer(cb) {
//   socket.on('timer', cb); // Subscribe first in case of race condition
//   socket.emit('subscribeToTimer', 3000);
// }

function subscribeToUpdatedAnki(cb) {
  socket.on('updatedAnki', cb);
}

export { subscribeToUpdatedAnki };
