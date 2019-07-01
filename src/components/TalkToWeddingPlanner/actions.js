import * as types from './constants';

export function postContactDetails(details) {
    return {
      types: [
        types.POST_FORMDATA,
        types.POST_FORMDATA_SUCCESS,
        types.POST_FORMDATA_FAILURE
      ],
      promise: client => client.post(`/api/home/savecontact`, details)
    };
  }

  export function clearTalkToErrors() {
    return {
      type: types.CLEAR_TALKTO_ERRORS
    }
  }

  export function showPlanner() {
    return {
      type: types.SHOW_PLANNER
    }
  }

  export function hidePlanner() {
    return {
      type: types.HIDE_PLANNER
    }
  }
