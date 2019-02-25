import * as types from './constants';

const initialState = {
  user: null,
  loading: false,
  showLogin: false,
  error: null,
  message: '',
};

const session = (state = initialState, action) => {
  let result = {};
  switch (action.type) {
    case types.LOAD_SIGNIN:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_SIGNIN_SUCCESS:
      result = action.result || {};
      localStorage.setItem("token", result.data.data.token);
      localStorage.setItem("logged_in", true);
      localStorage.setItem("user", JSON.stringify(result.data.data.user));
      return {
        ...state,
        user: result.data.data.user,
        loading: false,
        showLogin: false,
        error: null
      };

    case types.LOAD_SIGNIN_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    case types.LOAD_SIGNUP:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_SIGNUP_SUCCESS:
      result = action.result || {};
      return {
        ...state,
        loading: false,
        showLogin: false,
        error: null
      };

    case types.LOAD_SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    case types.LOAD_LOGOUT:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_LOGOUT_SUCCESS:
      result = action.result || {};
      return {
        ...state,
        user: null,
        loading: false,
        error: null
      };

    case types.LOAD_LOGOUT_FAILURE:
      return {
        ...state,
        user: null,// this will be removed
        error: action.error.message,
        loading: false
      };

    case types.SHOW_LOGIN:
      return {
        ...state,
        showLogin: true
      };

    case types.HIDE_LOGIN:
      return {
        ...state,
        showLogin: false
      };

      case types.REQUEST_FORGOT:
      return {
        ...state,
        message: ''
      };

    case types.REQUEST_FORGOT_SUCCESS:
      return {
        ...state,
        message: action.result.data.message,
      };
    
    case types.REQUEST_FORGOT_FAILURE:
    return {
      ...state,
      message: action.error.message,
      };

    case types.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        message: ''
      };

    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.result.data.message,
        loading: false
      };

    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        message: action.error.message,
        loading: false
      };

    default:
      return state;
  }
};

export default session;

// SELECTORS
// ================================================
export const selectCurrentUser = state => {
  return state.session.user;
};
