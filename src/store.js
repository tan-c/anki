import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'utility-redux/rootSaga.anki';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

let store = null; // eslint-disable-line

const env = process.env.NODE_ENV;
const middleWares = [sagaMiddleware, thunk];

if (env === 'development') {
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
  //   // require('./ReactotronConfig');
  store = createStore(
    combineReducers(rootReducer),
    composeEnhancers(applyMiddleware(...middleWares)),
  );
} else {
  store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(...middleWares),
  );
}

sagaMiddleware.run(rootSaga);

export default store;


// / **************  ReactotronConfig.js - in case need in future *************

// import Reactotron from 'reactotron-react-js';
// import { reactotronRedux } from 'reactotron-redux';

// // THIS SHOULD BE JUST FOR development
// // I AM RUNNING HERE FOR DBUGGING IN PRODUCTION

// Reactotron
//   .configure()
//   .use(reactotronRedux())
//   .connect();

// Reactotron.clear(); // clear when setup


// IF FAILLING ON SOCKET.IO
// Retrying and Backoffs
//
// You have control over Socket.IO and can pass through settings to control that in your Reactotron.configure({}) call.
//
//   Reactotron.configure({
//     socketIoProperties: {
//       reconnection: true,
//       reconnectionDelay: 2000,
//       reconnectionDelayMax: 5000,
//       reconnectionAttempts: 5
//     }
//   })
