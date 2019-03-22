import * as types from './constants';
const initialState = {
  categories: [],
  loading: false,
  pingMessage: ''
};

const SampleReducer = (state = initialState, action) => {
  let result = [];
  switch (action.type) {
    case types.LOAD_CATEGORIES:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_CATEGORIES_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        categories: result.data,
        loading: false
      };

    case types.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    case types.PING:
      return {
        ...state,
        pingMessage: action.payload.ping
      };

    default:
      return state;
  }
};

export default SampleReducer;
