import * as types from './constants';
const initialState = {
    message: '',
    status: false,
    loading: false
};

const TalkToAhwanamReducer = (state = initialState, action) => {
    let result = [];
    switch (action.type) {

        case types.POST_FORMDATA:
            return {
                ...state,
                loading: true
            };

        case types.POST_FORMDATA_SUCCESS:
            result = action.result || [];
            return {
                ...state,
                status: true,
                message: result.data.message,
                loading: false
            };

        case types.POST_FORMDATA_FAILURE:
            return {
                ...state,
                status:false,
                message: action.error.message,
                loading: false
            };

        default:
            return state;
    }
};

export default TalkToAhwanamReducer;
