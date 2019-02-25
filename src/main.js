import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import configureStore from './utils/configureStore';
import './styles/index.scss';

const { store, history } = configureStore();

const Application = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App history={history}/>
    </ConnectedRouter>
  </Provider>
);

const root = document.querySelector('#root');

if (root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  Loadable.preloadReady().then(() => {
    hydrate(Application, root);
  });
} else {
  // If we're not running on the server, just render like normal
  render(Application, root);
}
