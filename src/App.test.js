import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './utils/configureStore';
import { ConnectedRouter } from 'connected-react-router';

describe('App', () => {
  it('renders without crashing', () => {
    const { store, history } = configureStore();
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
   </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
