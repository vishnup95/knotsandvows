import * as types from './constants';

const initialState = {
  wishListData: null,
  sharedWishListData: null,
  currentWishListData:null,
  loading: false,
  noteloading: false,
  current:{
    wishlist_id: 0,
    shared: false
  }
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
        current:{wishlist_id: action.result.data.data.wishlist_id, shared: false },
        loading: false
      };

    case types.LOAD_MY_WISHLIST_FAILURE:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };

      case types.LOAD_SHARED_WISHLIST:
      return {
        ...state,
        error:null,
        loading: true
      };

    case types.LOAD_SHARED_WISHLIST_SUCCESS:
      return {
        ...state,
        sharedWishListData: action.result.data.data,
        current:{wishlist_id: action.result.data.data.wishlist_id, shared: true },
        loading: false
      };

    case types.LOAD_SHARED_WISHLIST_FAILURE:
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
        apiStatus:null,
        error:null,
      };

    case types.LOAD_REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        wishListData: handleRemoveFromWishList(action.payload, state.wishListData),
        apiStatus:true
      };

    case types.LOAD_REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        apiStatus:false,
        wishListData: handleRemoveFromWishList(action.payload, state.wishListData),
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
        wishListData: !state.current.shared ? appendNotesToVendor(action.payload, state.wishListData, action.result.data.data.results) : state.wishListData,
        sharedWishListData: state.current.shared ? appendNotesToVendor(action.payload, state.sharedWishListData, action.result.data.data.results) : state.sharedWishListData,
        noteloading: false,
        error: null
      };

    case types.LOAD_NOTES_FAILURE:
      return {
        ...state,
        error: action.error.message,
        noteloading: false
      };

      case types.LOAD_ADD_COLLABORATOR:
      return {
        ...state,
        error:null
      };

    case types.LOAD_ADD_COLLABORATOR_SUCCESS:
      return {
        ...state,
        wishListData: handleAddCollaborator(action.result.data.data, state.wishListData),
      };

    case types.LOAD_ADD_COLLABORATOR_FAILURE:
      return {
        ...state,
        error: action.error.message,
      };

      case types.LOAD_REMOVE_COLLABORATOR:
      return {
        ...state,
        error:null
      };

    case types.LOAD_REMOVE_COLLABORATOR_SUCCESS:
      return {
        ...state,
        wishListData: handleRemoveCollaborator(action.payload, state.wishListData)
      };

    case types.LOAD_REMOVE_COLLABORATOR_FAILURE:
      return {
        ...state,
        error: action.error.message
      };
    
    case types.TOGGLE_SHARED_WISHLIST:
      return {
        ...state,
        current: {wishlist_id: action.payload.wishlist_id, shared: action.payload.shared}
      }

    default:
      return state;
  }
};

//append notes to wishlistdata on loading notes for a vendor
function appendNotesToVendor(details, wishListData, notes) {
  let wishListDataCopy = JSON.parse(JSON.stringify(wishListData));
  wishListDataCopy.wishlistitems.slice().find(
    item => item.category_id == details.category_id
  ).vendors.find(item => item.vendor_id == details.vendor_id)['notes'] = notes;
  return wishListDataCopy;
}

//remove a vendor from wishlist
function handleRemoveFromWishList(details, wishListData) {
  let wishListDataCopy = JSON.parse(JSON.stringify(wishListData));

  wishListDataCopy.wishlistitems.slice().find(
    item => item.category_id == details.category_id
  ).vendors = wishListDataCopy.wishlistitems.slice().find(
    item => item.category_id == details.category_id
  ).vendors.filter(item => item.vendor_id != details.vendor_id);
  
  return wishListDataCopy;
}

// remove a collaborator from wishlist
function handleRemoveCollaborator(collaborator, wishListData) {
  let wishListDataCopy = JSON.parse(JSON.stringify(wishListData));
  wishListDataCopy.collaborators = wishListDataCopy.collaborators.filter(user => user.collaborator_id !== collaborator);
  return wishListDataCopy; 
}

// add a collaborator to wishlist
function handleAddCollaborator(collaborator, wishListData) {
  if (!wishListData.collaborators) {
    wishListData.collaborators = [];
  }

  let wishListDataCopy = JSON.parse(JSON.stringify(wishListData));
  wishListDataCopy.collaborators.push(collaborator);
  return wishListDataCopy; 
}

export default WishListReducer;
