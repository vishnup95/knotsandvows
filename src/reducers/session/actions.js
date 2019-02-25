import * as types from './constants';

export function signInWithCredentail(credentail) {
  return {
    types: [
      types.LOAD_SIGNIN,
      types.LOAD_SIGNIN_SUCCESS,
      types.LOAD_SIGNIN_FAILURE
    ],
    promise: client => client.post(`/api/UserAuth/login`, credentail)
  };
}

export function registerWithDetails(details) {
  return {
    types: [
      types.LOAD_SIGNUP,
      types.LOAD_SIGNUP_SUCCESS,
      types.LOAD_SIGNUP_FAILURE
    ],
    promise: client => client.post(`/api/UserAuth/register`,details)
  };
}


export function logoutProcedure(history) {
  if(localStorage) {
    localStorage.setItem("token",null);
    localStorage.setItem("logged_in",false);
    localStorage.setItem("user",null);
  }
  
  return function (dispatch) {
    dispatch(logout()).then(
    () => redirectTo(history, '/'),
    )};
}

export function logout() {
  return {
    types: [
      types.LOAD_LOGOUT,
      types.LOAD_LOGOUT_SUCCESS,
      types.LOAD_LOGOUT_FAILURE
    ],
    promise: client => client.post(`/api/UserAuth/logout`, null)
  };
}

function redirectTo(history, pathname) {
  history.push({
    pathname: pathname,
    state: {
    nextPath:'/'
  }
  });
}
export function showLogin() {
  return {
    type: types.SHOW_LOGIN
  }
}

export function hideLogin() {
  return {
    type: types.HIDE_LOGIN
  }
}

export function forgotPasswordRequest(data) {
  return {
    types: [
      types.REQUEST_FORGOT,
      types.REQUEST_FORGOT_SUCCESS,
      types.REQUEST_FORGOT_FAILURE
    ],
    promise: client => client.post('api/UserAuth/forgotpassword',data)
  }
}

export function resetPassword(data) {
  return {
    types: [
      types.RESET_PASSWORD,
      types.RESET_PASSWORD_SUCCESS,
      types.RESET_PASSWORD_FAILURE
    ],
    promise: client => client.post('/api/UserAuth/reset', data)
  };
}


export function autheticateWithSocialData(data) {
  return {
    types: [
      types.LOAD_SIGNIN,
      types.LOAD_SIGNIN_SUCCESS,
      types.LOAD_SIGNIN_FAILURE
    ],
    promise: client => client.post('/api/UserAuth/sociallogin', data)
  };
}