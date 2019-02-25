import * as types from './constants';

const initialState = {
    show: false,
    message: ''
};

const modal = (state = initialState, action) => {
    switch (action.type) {
      case types.SHOW_MODAL:
        return {
          ...state,
          show: true,
          message: action.message
        };
  
      case types.HIDE_MODAL:
        return {
          ...state,
          show: false,
          message: ''
        };

      default:
        return state;
    }
};
  
export default modal;

