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

// export function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
//   try {
//     decimalCount = Math.abs(decimalCount);
//     decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

//     const negativeSign = amount < 0 ? "-" : "";

//     let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
//     let j = (i.length > 3) ? i.length % 3 : 0;

//     return `₹`+negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
//   } catch (e) {
//     return `₹`+amount;
//   }
// }

export function formatMoney(amount) {
  if (amount && amount != 0){
    return `₹`+amount;
  }else{
    return `Price on request`;
  }
}