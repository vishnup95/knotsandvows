import * as types from './constants';
export function fetchCategories() {
  return {
    types: [
      types.LOAD_CATEGORIES,
      types.LOAD_CATEGORIES_SUCCESS,
      types.LOAD_CATEGORIES_FAILURE
    ],
    promise: client => client.get(`/users`)
  };
}

export function ping(data) {
  return {
    type: types.PING,
    payload: data
  };
}
