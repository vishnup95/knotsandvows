import * as types from './constants';
const initialState = {
  details: null, //used for all vendors as well.
  similar_ceremonenies:[],
  loading: null,
  allVendorDetails:{
      categories:[],
      fixedCategories:[]
  }
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
        details: removeUnwantedCategoriesFromCeremonies(result.data.data),
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
        loading: true
      };

    case types.LOAD_ALL_VENDORS_SUCCESS:
      result = action.result || [];
      return {
        ...state,
        allVendorDetails: removeUnwantedCategoriesFromAllVendors(result.data.data),
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
    case types.UPDATE_CATEGORY_ORDER:
      return {
        ...state,
       allVendorDetails:{...state.allVendorDetails, categories: updateCategoriesOrder(state.allVendorDetails.categories, action.payload)}
     };
      case types.CLEAR_CEREMONY_DETAILS:
      return {
        ...state,
        details: null,
        allVendorDetails:initialState.allVendorDetails
      };

    default:
      return state;
  }
};

function removeUnwantedCategoriesFromCeremonies(ceremonyDetails){
  let filteredCategories = ceremonyDetails.categories.filter(item => {
     return item.vendors !== null && item.vendors.length > 0
  })
  ceremonyDetails.categories = filteredCategories;
  ceremonyDetails.fixedCategories = filteredCategories;
  return ceremonyDetails;
}

function removeUnwantedCategoriesFromAllVendors(allVendorDetails){
 let filteredCategories = allVendorDetails.categories.filter(item => {
    return item.vendors !== null && item.vendors.length > 0
  })
  return {categories:filteredCategories, fixedCategories: filteredCategories}
}
 
function updateCategoriesOrder(categories,index){
  let updatedCategories = categories.slice();
  let temp = updatedCategories[0];
  updatedCategories[0] = updatedCategories[index];
  updatedCategories[index] = temp;
  return updatedCategories;
}

export default CeremonyDetailReducer;
