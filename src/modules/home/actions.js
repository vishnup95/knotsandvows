import * as types from './constants';

export function fetchCategories() {
  return {
    types: [
      types.LOAD_CATEGORIES,
      types.LOAD_CATEGORIES_SUCCESS,
      types.LOAD_CATEGORIES_FAILURE
    ],
    promise: client => client.get(`/api/home/categories`)
  };
}

export function fetchExclusives() {
  return {
    types: [
      types.LOAD_EXCLUSIVES,
      types.LOAD_EXCLUSIVES_SUCCESS,
      types.LOAD_EXCLUSIVES_FAILURE
    ],
    promise: client => client.get(`/api/home/deals`)
  };
}

export function fetchCeremonies() {
  return {
    types: [
      types.LOAD_CEREMONIES,
      types.LOAD_CEREMONIES_SUCCESS,
      types.LOAD_CEREMONIES_FAILURE
    ],
    promise: client => client.get(`/api/home/ceremonies`)
  };
}
