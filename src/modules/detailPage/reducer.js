import * as types from './constants';
const initialState = {
  details: null,
  reviewsData: null,
  similarVendors:[],
  loading: false
};

const VendorDetailReducer = (state = initialState, action) => {
  let result = [];
  switch (action.type) {
    case types.LOAD_DETAILS:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_DETAILS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        details: result.data.data,
        loading: false
      };

    case types.LOAD_DETAILS_FAILURE:
      return {
        ...state,
        details:null,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_GALLERY:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_GALLERY_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        details: {...state.details, gallery : result.data.data.gallery},
        loading: false
      };

    case types.LOAD_GALLERY_FAILURE:
      return {
        ...state,
        details: {...state.details, gallery : []},
        error: action.error.message,
        loading: false
      };

    //   case types.LOAD_POLICIES:
    //   return {
    //     ...state,
    //     loading: true
    //   };

    // case types.LOAD_POLICIES_SUCCESS:
    //   result = action.result || [];
    //   return {
    //     ...state,
    //     policies: result.data.data,
    //     loading: false
    //   };

    // case types.LOAD_POLICIES_FAILURE:
    //   return {
    //     ...state,
    //     policies:[],
    //     error: action.error.message,
    //     loading: false
    //   };

    case types.LOAD_REVIEWS:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_REVIEWS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        reviewsData: result.data.data,
        loading: false
      };

    case types.LOAD_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_SIMILAR_VENDORS:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_SIMILAR_VENDORS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        similarVendors: result.data.results,
        loading: false
      };

    case types.LOAD_SIMILAR_VENDORS_FAILURE:
      return {
        ...state,
        similarVendors:[],
        error: action.error.message,
        loading: false
      };

    default:
      return state;
  }
};

export default VendorDetailReducer;
