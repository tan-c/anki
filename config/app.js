let localAddressString = 'localhost';

let env = '';

if (typeof (__DEV__) !== 'undefined') {
  env = __DEV__ ? 'development' : 'production';
} else {
  env = window.location.href.indexOf('localhost') > -1 ? 'development' : 'production';
}

// NOTE: for mobile only - is it for production ?
// Using process.env.WEBPACK will work for mobile as it does not go through webpack
// FIXME: this might not work for desktop, but it should be fine now
if (window === undefined || window.location === undefined) {
  localAddressString = '192.168.1.9';
}

const config = {
  BASE_URL: env === 'development' ? `http://${localAddressString}:8081` : 'https://api.tanchen.me',
};

export default config;
