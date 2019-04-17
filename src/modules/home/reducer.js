import * as types from './constants';
const initialState = {
  categories: [],
  exclusives: [],
  ceremonies: [],
  loading: false
};

const HomeReducer = (state = initialState, action) => {
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
        categories: result.data.results,
        loading: false
      };

    case types.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    case types.LOAD_EXCLUSIVES:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_EXCLUSIVES_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        exclusives: result.data.results,
        loading: false
      };

    case types.LOAD_EXCLUSIVES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_CEREMONIES:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_CEREMONIES_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        ceremonies: result.data.data.results,
        loading: false
      };

    case types.LOAD_CEREMONIES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    default:
      return state;
  }
};

export default HomeReducer;
