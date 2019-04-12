import * as types from './constants';
export function fetchMyWishlist() {
  return {
    types: [
      types.LOAD_MY_WISHLIST,
      types.LOAD_MY_WISHLIST_SUCCESS,
      types.LOAD_MY_WISHLIST_FAILURE
    ],
    promise: client => client.get(`/api/wishlist/getmywishlist`)
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

export function addToWishlist(params) {
  return {
    types: [
      types.LOAD_ADD_TO_WISHLIST,
      types.LOAD_ADD_TO_WISHLIST_SUCCESS,
      types.LOAD_ADD_TO_WISHLIST_FAILURE
    ],
    category: params.category_id,
    promise: client => client.post(`/api/wishlist/additem`,params)
  };
}

export function removeFromWishlist(params) {
  return {
    types: [
      types.LOAD_REMOVE_FROM_WISHLIST,
      types.LOAD_REMOVE_FROM_WISHLIST_SUCCESS,
      types.LOAD_REMOVE_FROM_WISHLIST_FAILURE
    ],
    payload : {
      vendor_id: params.vendor_id,
      wishlist_id: params.wishlist_id,
      category_id: params.category_id
    },
    promise: client => client.delete(`/api/wishlist/removeitem?wishlist_id=${params.wishlist_id}&vendor_id=${params.vendor_id}`)
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

// notes

export const fetchAllNotes = (details) => {
  // details = {vendor_id, wishlist_id, category_id}
  return {
    types: [
      types.LOAD_NOTES,
      types.LOAD_NOTES_SUCCESS,
      types.LOAD_NOTES_FAILURE
    ],
    payload: details,
    promise: client => client.get(`/api/getallnotes?vendor_id=${details.vendor_id}&wishlist_id=${details.wishlist_id}`)
  };
}

export function addNote(params, dispatch) {
  return {
    types: [
      types.LOAD_ADD_NOTE,
      types.LOAD_ADD_NOTE_SUCCESS,
      types.LOAD_ADD_NOTE_FAILURE
    ],
    promise: client => client.post(`/api/wishlist/addnote`, params)
      .then(() => dispatch(this.fetchAllNotes(params)))
        .catch(error => console.log(error))
  };
}

export function addCollabrator(params) {
  return {
    types: [
      types.LOAD_ADD_COLLABRATOR,
      types.LOAD_ADD_COLLABRATOR_SUCCESS,
      types.LOAD_ADD_COLLABRATOR_FAILURE
    ],
    promise: client => client.post(`/api/addcollabrator`, params)
  };
}

export function removeCollabrator(collabrator) {
  return {
    types: [
      types.LOAD_REMOVE_COLLABRATOR,
      types.LOAD_SHARED_WISHLIST_SUCCESS,
      types.LOAD_REMOVE_COLLABRATOR_FAILURE
    ],
    promise: client => client.delete(`/api/removecollabrator?collabrator_id=${collabrator}`)
  };
}
