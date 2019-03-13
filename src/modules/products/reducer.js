import * as types from './constants';
const initialState = {
  productListData: {
    no_of_pages: 0,
    offset: 0,
    results:[],
    service_type: null,
    sort_options: -1,
    total_count: 0   
  },
  loading: false,
  filterData: {
    header: null,
    filters:[],
    sort_options: []
  },
  other_categories : []
};

const ProductsReducer = (state = initialState, action) => {
  let result = [];
  switch (action.type) {
    case types.LOAD_PRODUCTS:
      return {
        ...state,
        productListData: initialState.productListData,
        loading: true
      };

    case types.LOAD_PRODUCTS_SUCCESS:
      result = action.result || {};
      return {
        ...state,
        productListData: result.data.data,
        loading: false
      };

    case types.LOAD_PRODUCTS_FAILURE:
      return {
        ...state,
        productListData:initialState.productListData,
        error: action.error.message,
        loading: false
      };
    
      case types.LOAD_FILTERS:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_FILTERS_SUCCESS:
      result = action.result || {};
      return {
        ...state,
        filterData: result.data.data,
        loading: false
      };

    case types.LOAD_FILTERS_FAILURE:
      return {
        ...state,
        filterData: initialState.filterData,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_OTHER_CATEGORIES:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_OTHER_CATEGORIES_SUCCESS:
      result = action.result || {};
      return {
        ...state,
        other_categories: result.data.data.results,
        loading: false
      };

    case types.LOAD_OTHER_CATEGORIES_FAILURE:
      return {
        ...state,
        other_categories: [],
        error: action.error.message,
        loading: false
      };

    default:
      return state;
  }
};

export default ProductsReducer;
