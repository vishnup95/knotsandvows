import * as types from './constants';

const initialState = {
  wishListData: null,
  sharedWishListData: null,
  currentWishListData:null,
  loading: false,
  noteloading: false
};

const WishListReducer = (state = initialState, action) => {
  //let result = [];
  switch (action.type) {

    case types.LOAD_MY_WISHLIST:
      return {
        ...state,
        error:null,
        loading: true
      };

    case types.LOAD_MY_WISHLIST_SUCCESS:
      return {
        ...state,
        wishListData: action.result.data.data, 
        loading: false
      };

    case types.LOAD_MY_WISHLIST_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

    case types.LOAD_ADD_TO_WISHLIST:
      return {
        ...state,
        loading:true,
        apiStatus:null,
        error:null,
      };

    case types.LOAD_ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading:false,
        apiStatus:true
      };

    case types.LOAD_ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        loading:false,
        apiStatus:false,
        error: action.error.message,
      };

      case types.LOAD_REMOVE_FROM_WISHLIST:
      return {
        ...state,
        loading:true,
        apiStatus:null,
        error:null,
      };

    case types.LOAD_REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        loading:false,
        apiStatus:true
      };

    case types.LOAD_REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        loading:false,
        apiStatus:false,
        error: action.error.message,
      };

    //notes 

    case types.LOAD_NOTES:
      return {
        ...state,
        noteloading: true
      };

    case types.LOAD_NOTES_SUCCESS:
      return {
        ...state,
        wishListData: appendNotesToVendor(action.payload, state.wishListData, action.result.data.data.results),
        noteloading: false,
        error: null
      };

    case types.LOAD_NOTES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        noteloading: false
      };

    default:
      return state;
  }
};

// function addItemToWishList(state, payload, userWishlistsID) {
//   let vendor = payload.vendor;
//   vendor.notes = [];
//   vendor.userWishlistsID = userWishlistsID;
//   let list = state.list;
//   list.push(vendor);
//   // let wishlist = state.currentWishListData;
//   // let index = wishlist.wishlistitems.findIndex( category => { return typeof category.category_id == payload.category} );
//   // if (index != -1){
//   //   let category = wishlist.wishlistitems[index];
//   //   category.vendor.push(vendor);
//   // }
//   //return wishlist
//   return list;
// }

function appendNotesToVendor(details, wishListData, notes) {
  let wishListDataCopy = JSON.parse(JSON.stringify(wishListData));
  wishListDataCopy.wishlistitems.slice().find(
    item => item.category_id === details.category_id
  ).vendors.find(item => item.vendor_id === details.vendor_id)['notes'] = notes;
  return wishListDataCopy;
}

export default WishListReducer;
