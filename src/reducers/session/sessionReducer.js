import * as types from './constants';

const initialState = {
  user: null,
  loading: false,
  showLogin: false,
  showForgotPassword: false,
  showResetPassword: false,
  error: null,
  message: '',
  apiStatus: null
};

const session = (state = initialState, action) => {
  let result = {};
  switch (action.type) {
    case types.LOAD_SIGNIN:
      return {
        ...state,
        loading: true,
        apiStatus: null,
        message: null,
        error: null
      };

    case types.LOAD_SIGNIN_SUCCESS:
      result = action.result || {};
      localStorage.setItem("token", result.data.data.token);
      localStorage.setItem("logged_in", true);
      return {
        ...state,
        user: result.data.data.user,
        loading: false,
        showLogin: false,
        error: null,
        apiStatus: true
      };

    case types.LOAD_SIGNIN_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false,
        apiStatus: false
      };

    case types.LOAD_SIGNUP:
      return {
        ...state,
        loading: true,
        apiStatus: null,
        error: null,
        message: ''
      };

    case types.LOAD_SIGNUP_SUCCESS:
      result = action.result || {};
      return {
        ...state,
        loading: false,
        showLogin: false,
        message: result.data.message,
        error: null,
        apiStatus: true
      };

    case types.LOAD_SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false,
        apiStatus: false
      };

    case types.LOAD_LOGOUT:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_LOGOUT_SUCCESS:
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
        message: '',
        showLogin: true,
        error: null,
        apiStatus: null
      };

    case types.HIDE_LOGIN:
      return {
        ...state,
        showLogin: false
      };

    case types.SHOW_FORGOT_PASSWORD:
      return {
        ...state,
        message: '',
        apiStatus: null,
        error: null,
        showForgotPassword: true
      };

    case types.HIDE_FORGOT_PASSWORD:
      return {
        ...state,
        showForgotPassword: false
      };

    case types.SHOW_RESET_PASSWORD:
      return {
        ...state,
        message: '',
        apiStatus: null,
        error: null,
        showResetPassword: true
      };

    case types.HIDE_RESET_PASSWORD:
      return {
        ...state,
        showResetPassword: false
      };

    case types.REQUEST_FORGOT:
      return {
        ...state,
        apiStatus: null,
        loading: false,
        message: ''
      };

    case types.REQUEST_FORGOT_SUCCESS:
      return {
        ...state,
        apiStatus: true,
        loading: true,
        showForgotPassword: false,
        message: action.result.data.message,
      };

    case types.REQUEST_FORGOT_FAILURE:
      return {
        ...state,
        loading: false,
        apiStatus: false,
        message: action.error.message,
      };

    case types.RESET_PASSWORD:
      return {
        ...state,
        apiStatus: null,
        loading: true,
        message: ''
      };

    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        showResetPassword: false,
        apiStatus: true,
        message: action.result.data.message,
        loading: false
      };

    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        apiStatus: false,
        message: action.error.message,
        loading: false
      };

    case types.LOAD_VERIFY_EMAIL:
      return {
        ...state,
        apiStatus: null,
        loading: true,
        error:"",
      };

    case types.LOAD_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        apiStatus: true,
        loading: false
      };

    case types.LOAD_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        apiStatus: false,
        error: action.error.message,
        loading: false
      };

    case types.LOAD_PROFILE:
      return {
        ...state,
        loading: true,
        message: ''
      };

    case types.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        message: action.result.data.message,
        user: action.result.data.data.user,
        loading: false
      };

    case types.LOAD_PROFILE_FAILURE:
      return {
        ...state,
        message: action.error.message,
        loading: false
      };

    case types.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        message: '',
        apiStatus: null
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
