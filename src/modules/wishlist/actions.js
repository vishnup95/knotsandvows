import * as types from './constants';
export function fetchMyWishlist() {
  return {
    types: [
      types.LOAD_MY_WISHLIST,
      types.LOAD_MY_WISHLIST_SUCCESS,
      types.LOAD_MY_WISHLIST_FAILURE
    ],
    promise: client => client.get(`/api/mywishlist`)
  };
}

export function fetchSharedWishlist(wishlist) {
  return {
    types: [
      types.LOAD_SHARED_WISHLIST,
      types.LOAD_SHARED_WISHLIST_SUCCESS,
      types.LOAD_SHARED_WISHLIST_FAILURE
    ],
    promise: client => client.get(`/api/sharedwishlist?id=${wishlist}`)
  };
}

export function addToWishlist(vendor, params) {
  return {
    types: [
      types.LOAD_ADD_TO_WISHLIST,
      types.LOAD_ADD_TO_WISHLIST_SUCCESS,
      types.LOAD_ADD_TO_WISHLIST_FAILURE
    ],
    vendor: vendor,
    category: params.category,
    promise: client => client.post(`/api/additem`,params)
  };
}

export function removeFromWishlist(vendor, params) {
  return {
    types: [
      types.LOAD_ADD_TO_WISHLIST,
      types.LOAD_ADD_TO_WISHLIST_SUCCESS,
      types.LOAD_ADD_TO_WISHLIST_FAILURE
    ],
    payload : {
      vendor: vendor,
      category: params.category
    },
    promise: client => client.post(`/api/additem`,params)
  };
}

export function testAdd(vendor, category) {
  return {
    type: types.LOAD_ADD_TO_WISHLIST_SUCCESS,
    payload : {
      vendor: vendor,
      category: category
    }
  }
}