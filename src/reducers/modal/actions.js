import * as types from './constants';

export function showModal(message) {
    return {
        type: types.SHOW_MODAL,
        popupContent: message
    }
}

export function hideModal() {
    return {
        type: types.HIDE_MODAL
    }
}