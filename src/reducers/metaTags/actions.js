import * as types from './constants';

export function updateMetaData(metaData) {
    return {
        type: types.UPDATE_METADATA,
        payload: metaData
    }
}