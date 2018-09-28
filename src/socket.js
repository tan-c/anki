import openSocket from 'socket.io-client';

let env = '';

if (typeof (__DEV__) !== 'undefined') {
  env = __DEV__ ? 'development' : 'production';
} else {
  env = window.location.href.indexOf('localhost') > -1 ? 'development' : 'production';
}
const BASE_URL = env === 'development' ? 'http://localhost:8081' : 'https://api.tanchen.me';

const socket = openSocket(BASE_URL);

// function subscribeToTimer(cb) {
//   socket.on('timer', cb); // Subscribe first in case of race condition
//   socket.emit('subscribeToTimer', 3000);
// }

function subscribeToUpdatedAnki(cb) {
  socket.on('updatedAnki', cb);
}

export { subscribeToUpdatedAnki };
