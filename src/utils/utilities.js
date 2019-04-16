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
  hyphonated = hyphonated.replace(/ /g, "-");
  hyphonated = hyphonated.replace(/[^a-zA-Z0-9]-/g, "");
  hyphonated = hyphonated +"-"+ id ;
  return hyphonated;
}

export function formatDate(date) {
  let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  let newDate = new Date(date);
  
  let formattedDate =  new Intl.DateTimeFormat('en-GB', options).format(newDate);
  return formattedDate.toUpperCase();
}

export function getDataFromResponse(response) {
  if (response && response.data && response.data.status && response.data.status == true) {
    return null;
  }else  if (response && response.data && response.data.message) {
    return response.data.message;
  }else {         
    return "Unexpected error occured, try again later";
  }
}

export function shortName(userName){
    if (userName) {
        var initials = userName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return (initials);
    }
    return 'NU';
}