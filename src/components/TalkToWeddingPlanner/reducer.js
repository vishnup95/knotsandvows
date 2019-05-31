import * as types from './constants';
const initialState = {
    message: '',
    status: false,
    loading: false,
    showPlanner: false
};

const TalkToAhwanamReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.POST_FORMDATA:
            return {
                ...state,
                message: '',
                loading: true,
                status:null
            };

        case types.POST_FORMDATA_SUCCESS:
            return {
                ...state,
                status: true,
                loading: false
            };

        case types.POST_FORMDATA_FAILURE:
            return {
                ...state,
                status: false,
                message: action.error.message,
                loading: false
            };

        case types.CLEAR_TALKTO_ERRORS:
            return {
                ...state,
                loading: false,
                error: null,
                message: '',
                status: null
            };
        
        case types.SHOW_PLANNER:
            return {
                ...state,
                showPlanner: true
            };
        
        case types.HIDE_PLANNER:
            return {
                ...state,
                showPlanner: false
            };

        default:
            return state;
    }
};

export default TalkToAhwanamReducer;
