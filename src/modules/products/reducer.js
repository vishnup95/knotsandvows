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
    filters:null,
    sort_options: []
  },
  tempfilterData: {
    header: null,
    filters:null,
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
        loading: true,
        apiStatus: null
      };

    case types.LOAD_PRODUCTS_SUCCESS:
      result = action.result || {};    
      if (action.isFirstLoading){
        return {
          ...state,
          productListData: result.data.data,
          loading: false,
          apiStatus: true
        };
      }else{
        return {
          ...state,
          productListData: result.data.data,
          filterData: {...state.filterData, sort_options: state.tempfilterData.sort_options, header: state.tempfilterData.header},
          loading: false,
          apiStatus: false
        };
      }

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
      };

    case types.LOAD_FILTERS_SUCCESS:
      result = action.result || {};
      var data = addStaticFilter(result.data.data);
      if (action.isFirstLoading){
        return {
          ...state,
          filterData: data,
          tempfilterData : data
        };
      }else{
        return {
          ...state,
          tempfilterData : data,
          filterData : {...state.filterData, filters: data.filters}
        };
      }
  
    case types.LOAD_FILTERS_FAILURE:
      return {
        ...state,
        error: action.error.message,
      };

      case types.LOAD_OTHER_CATEGORIES:
      return {
        ...state,
      };

    case types.LOAD_OTHER_CATEGORIES_SUCCESS:
      result = action.result || {};
      return {
        ...state,
        other_categories: result.data.data.results,
      };

    case types.LOAD_OTHER_CATEGORIES_FAILURE:
      return {
        ...state,
        other_categories: [],
        error: action.error.message,
      };
      case types.CLEAR_VENDOR_LIST_DATA:
      return {
        ...state,
        other_categories: [],
        error: null,
        productListData: initialState.productListData,
        filterData: initialState.filterData,
        tempfilterData: initialState.tempfilterData
      };

    default:
      return state;
  }
};

function addStaticFilter(response) {
   if (response && response.filters && response.filters.length >= 0){
      // var cityFilter  = {
      //   display_name:"City",
      //   name:"city",
      //   values:[
      //       {name: "Hyderabad", id: 0},
      //       // {name: "Secunderabad", id: 1},
      //       {name: "Vijayawada", id: 2},
      //       {name: "Vizag", id: 3}
      //   ]
      // }
      // response.filters.splice(0,0,cityFilter);
      response.filters.map(filter => filter.values.unshift({name: 'All', id: ''}))
   }
   return response;
}

export default ProductsReducer;
