import * as types from './constants';

const initialState = {
    metadata : null
};

const MetaDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.UPDATE_METADATA:
        return {
          ...state,
          metadata: action.payload
        };
      default:
        return state;
    }
};
  
export default MetaDataReducer;

