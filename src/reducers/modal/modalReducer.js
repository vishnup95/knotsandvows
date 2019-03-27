import * as types from './constants';

const initialState = {
    show: false,
    modalContent: {
      heading: '',
      message: ''
    }
};

const modal = (state = initialState, action) => {
    switch (action.type) {
      case types.SHOW_MODAL:
        return {
          ...state,
          show: true,
          modalContent: action.popupContent
        };
  
      case types.HIDE_MODAL:
        return {
          ...state,
          show: false,
          modalContent: initialState.modalContent
        };

      default:
        return state;
    }
};
  
export default modal;

