import { createBrowserHistory, createMemoryHistory } from 'history';

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const history = isServer
  ? createMemoryHistory({
      initialEntries: ['/']
    })
  : createBrowserHistory();

// A nice helper to tell us if we're on the server

export function isLoggedIn(){
  return !isServer && window.localStorage && window.localStorage.getItem('logged_in') == 'true'
}