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

export function getId(hyphonatedString){
  var hyphonated = hyphonatedString.split("-");
  if (hyphonated && hyphonated.length > 0){
    const id = hyphonated[hyphonated.length - 1];
    return id;
  } 
  return 0;
}

export function hyphonatedString(name, id){
  var hyphonated = name.toLowerCase();
  hyphonated = hyphonated.replace(/[^a-zA-Z0-9]/g, "");
  hyphonated = hyphonated.replace(" ", "-");
  hyphonated = hyphonated +"-"+ id ;
  return hyphonated;
}