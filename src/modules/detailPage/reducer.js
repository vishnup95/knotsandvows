import * as types from './constants';
const initialState = {
  details: null,
  gallery : [],
  reviewsData: null,
  similarVendors:[],
  loading: false,
  notes:[]
};

const VendorDetailReducer = (state = initialState, action) => {
  let result = [];
  switch (action.type) {
    case types.LOAD_DETAILS:
      return {
        ...state,
        details: null,
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
      };

    case types.LOAD_GALLERY_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        gallery: result.data.data.gallery,
      };

    case types.LOAD_GALLERY_FAILURE:
      return {
        ...state,
        gallery: [],
        error: action.error.message,
      };

      case types.LOAD_NOTES:
      return {
        ...state,
        notes:[]
      };

    case types.LOAD_NOTES_SUCCESS:
      return {
        ...state,
        notes:  action.result.data.data.results,
        error: null
      };

    case types.LOAD_NOTES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        notes:[]
      };

    case types.LOAD_REVIEWS:
      return {
        ...state,
      };

    case types.LOAD_REVIEWS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        reviewsData: result.data.data,
      };

    case types.LOAD_REVIEWS_FAILURE:
      return {
        ...state,
        reviewsData : null,
        error: action.error.message,
      };

      case types.LOAD_SIMILAR_VENDORS:
      return {
        ...state,
      };

    case types.LOAD_SIMILAR_VENDORS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        similarVendors: result.data.data.results,
      };

    case types.LOAD_SIMILAR_VENDORS_FAILURE:
      return {
        ...state,
        similarVendors:[],
        error: action.error.message,
      };

    default:
      return state;
  }
};

export default VendorDetailReducer;
