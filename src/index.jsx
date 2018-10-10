import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
// 415 is for IphoneX 8 plus, Iphone8/IphoneX is 375

import moment from 'moment'; // Just to supress warnings
import AppConnected from './App';
// import { subscribeToUpdatedAnki } from './socket';
import store from './store';
import registerServiceWorker from './sw/registerServiceWorker';

moment.suppressDeprecationWarnings = true;

const renderApp = (Component) => {
  render(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <HashRouter>
          <Component />
        </HashRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};
renderApp(AppConnected);

// The trigger to login is handled in App.jsx by Auth0
// store.dispatch({
//   type: 'GET_CURRENT_USER_INFO',
//   project: 'wankee',
// });

// subscribeToUpdatedAnki((updatedAnki) => {
//   store.dispatch({
//     type: 'UPDATE_ANKI_SUCCESS',
//     anki: JSON.parse(updatedAnki),
//   });
//   toastr.info('Anki updated from socket');
// });

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(AppConnected);
  });
}

if (process.env.NODE_ENV !== 'development') {
  registerServiceWorker();
}
