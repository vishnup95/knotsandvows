import * as types from './constants';

export function fetchProducts(category, page = 1, sortby = 0, searchParams = '', isFirstLoading = true) {
  let getUrl = `api/results/getall?type=${category}&offset=12&page=${page}&sortby=${sortby}`;
  getUrl = searchParams ? `${getUrl}&${searchParams}` : getUrl;
  return {
    types: [
      types.LOAD_PRODUCTS,
      types.LOAD_PRODUCTS_SUCCESS,
      types.LOAD_PRODUCTS_FAILURE
    ],
    isFirstLoading: isFirstLoading,
    promise: client => client.get(getUrl)
  };
}

export function fetchFilters(category, isFirstLoading = true) {
  return {
    types: [
      types.LOAD_FILTERS,
      types.LOAD_FILTERS_SUCCESS,
      types.LOAD_FILTERS_FAILURE
    ],
    isFirstLoading: isFirstLoading,
    promise: client => client.get(`api/results/getfilters?type=${category}`)
  };
}

export function fetchOtherCategories(category) {
  return {
    types: [
      types.LOAD_OTHER_CATEGORIES,
      types.LOAD_OTHER_CATEGORIES_SUCCESS,
      types.LOAD_OTHER_CATEGORIES_FAILURE
    ],
    promise: client => client.get(`api/category/relatedcategories?type=${category}`)
  };
}