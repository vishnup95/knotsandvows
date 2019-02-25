import * as types from './constants';
const initialState = {
  emailVerified : null,
  loading: false
};

const VerifyEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_VERIFY_EMAIL:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        emailVerified: true,
        loading: false
      };

    case types.LOAD_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        emailVerified: false,
        error: action.error.message,
        loading: false
      };
    default:
      return state;
  }
};

export default VerifyEmailReducer;
