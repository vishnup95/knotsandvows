import * as types from './constants';

export function fetchProducts(category) {
  return {
    types: [
      types.LOAD_PRODUCTS,
      types.LOAD_PRODUCTS_SUCCESS,
      types.LOAD_PRODUCTS_FAILURE
    ],
    promise: client => client.get(`/api/results/getall?type=${category}`)
  };
}

export function fetchFilters(category) {
  return {
    types: [
      types.LOAD_FILTERS,
      types.LOAD_FILTERS_SUCCESS,
      types.LOAD_FILTERS_FAILURE
    ],
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