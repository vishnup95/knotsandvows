import * as types from './constants';
const initialState = {
  details: null, //used for all vendors as well.
  similar_ceremonenies:[],
  loading: null,
  allVendorDetails:null
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
        details: removeUnwantedCategoriesFromAllVendors(result.data.data),
        loading: false
      };

    case types.LOAD_CEREMONY_DETAILS_FAILURE:
      return {
        ...state,
        details: null,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_ALL_VENDORS:
      return {
        ...state,
        allVendorDetails:null,
        loading: true
      };

    case types.LOAD_ALL_VENDORS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        allVendorDetails: result.data.data,
        loading: false
      };

    case types.LOAD_ALL_VENDORS_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_SIMILAR_CEREMONIES:
      return {
        ...state,
      };

    case types.LOAD_SIMILAR_CEREMONIES_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        similar_ceremonenies: result.data.data.results,
      };

    case types.LOAD_SIMILAR_CEREMONIES_FAILURE:
      return {
        ...state,
        error: action.error.message,
      };

      case types.CLEAR_CEREMONY_DETAILS:
      return {
        ...state,
        details: null,
      };

    default:
      return state;
  }
};

function removeUnwantedCategoriesFromAllVendors(ceremonyDetails){
  let filteredCategories = ceremonyDetails.categories.filter(item => {
     return item.vendors !== null && item.vendors.length > 0
  })
  ceremonyDetails.categories = filteredCategories;
  ceremonyDetails.fixedCategories = filteredCategories;
  return ceremonyDetails;
}

export default CeremonyDetailReducer;
