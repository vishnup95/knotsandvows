import * as types from './constants';
const initialState = {
  details: null,
  similar_ceremonenies:[],
  loading: null
};

const CeremonyDetailReducer = (state = initialState, action) => {
  let result = [];
  switch (action.type) {
    case types.LOAD_CEREMONY_DETAILS:
      return {
        ...state,
        details: null,
        loading: true
      };

    case types.LOAD_CEREMONY_DETAILS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        details: result.data.data,
        loading: false
      };

    case types.LOAD_CEREMONY_DETAILS_FAILURE:
      return {
        ...state,
        details: null,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_SIMILAR_CEREMONIES:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_SIMILAR_CEREMONIES_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        similar_ceremonenies: result.data.data.results,
        loading: false
      };

    case types.LOAD_SIMILAR_CEREMONIES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    default:
      return state;
  }
};

export default CeremonyDetailReducer;
