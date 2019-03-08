import * as types from './constants';
export function fetchCeremonyDetails(ceremony, city = "") {
  return {
    types: [
      types.LOAD_CEREMONY_DETAILS,
      types.LOAD_CEREMONY_DETAILS_SUCCESS,
      types.LOAD_CEREMONY_DETAILS_FAILURE
    ],
    promise: client => client.get(`/api/ceremonies/details?ceremony=${ceremony}&city=${city}`)
  };
}
