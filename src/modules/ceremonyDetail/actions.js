import * as types from './constants';
import { getId } from '../../utils/utilities';

export function fetchCeremonyDetails(ceremony, city = "") {
  return {
    types: [
      types.LOAD_CEREMONY_DETAILS,
      types.LOAD_CEREMONY_DETAILS_SUCCESS,
      types.LOAD_CEREMONY_DETAILS_FAILURE
    ],
    promise: client => client.get(`/api/ceremonies/details?ceremony_id=${getId(ceremony)}&city=${city}`)
  };
}

export function fetchSimilarCeremonies(ceremony) {
  return {
    types: [
      types.LOAD_SIMILAR_CEREMONIES,
      types.LOAD_SIMILAR_CEREMONIES_SUCCESS,
      types.LOAD_SIMILAR_CEREMONIES_FAILURE
    ],
    promise: client => client.get(`/api/ceremonies/similarceremonies?ceremony_id=${getId(ceremony)}`)
  };
}
