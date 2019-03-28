import * as types from './constants';
const initialState = {
  wishListData: null,
  currentWishListData:null,
  loading: false,
  list:[]
};

const WishListReducer = (state = initialState, action) => {
  //let result = [];
  switch (action.type) {
    case types.LOAD_ADD_TO_WISHLIST:
      return {
        ...state,
        loading: true
      };

    case types.LOAD_ADD_TO_WISHLIST_SUCCESS:
      //result = action.result || [];
      return {
        ...state,
        list: addItemToWishList(state, action.payload, "12345678"),
        loading: false
      };

    case types.LOAD_ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    default:
      return state;
  }
};

function addItemToWishList(state, payload, userWishlistsID) {
  let vendor = payload.vendor;
  vendor.notes = [];
  vendor.userWishlistsID = userWishlistsID;
  let list = state.list;
  list.push(vendor);
  // let wishlist = state.currentWishListData;
  // let index = wishlist.wishlistitems.findIndex( category => { return typeof category.category_id == payload.category} );
  // if (index != -1){
  //   let category = wishlist.wishlistitems[index];
  //   category.vendor.push(vendor);
  // }
  //return wishlist
  return list;
}

export default WishListReducer;
