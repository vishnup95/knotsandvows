import * as types from './constants';
import { getId } from '../../utils/utilities';

export function fetchVendorDetails(vendor) {
  return {
    types: [
      types.LOAD_DETAILS,
      types.LOAD_DETAILS_SUCCESS,
      types.LOAD_DETAILS_FAILURE
    ],
    promise: client => client.get(`/api/getvendordetails?vendor_id=`+getId(vendor))
  };
}

export function fetchPolicies(vendor) {
  return {
    types: [
      types.LOAD_POLICIES,
      types.LOAD_POLICIES_SUCCESS,
      types.LOAD_POLICIES_FAILURE
    ],
    promise: client => client.get(`/api/policies?vendor_id=`+getId(vendor))
  };
}

export function fetchAmenities(vendor) {
  return {
    types: [
      types.LOAD_AMINITIES,
      types.LOAD_AMINITIES_SUCCESS,
      types.LOAD_AMINITIES_FAILURE
    ],
    promise: client => client.get(`/api/amenities?vendor_id=`+getId(vendor))
  };
}

export function fetchAvailableAreas(vendor) {
  return {
    types: [
      types.LOAD_AVAILABLE_AREAS,
      types.LOAD_AVAILABLE_AREAS_SUCCESS,
      types.LOAD_AVAILABLE_AREAS_FAILURE
    ],
    promise: client => client.get(`/api/details?vendor_id=`+getId(vendor))
  };
}

export function fetchSimilarVendors(vendor) {
  return {
    types: [
      types.LOAD_SIMILAR_VENDORS,
      types.LOAD_SIMILAR_VENDORS_SUCCESS,
      types.LOAD_SIMILAR_VENDORS_FAILURE
    ],
    promise: client => client.get(`/api/similarvendors?vendor_id=`+getId(vendor))
  };
}

export function fetchReviews(vendor, page) {
  return {
    types: [
      types.LOAD_REVIEWS,
      types.LOAD_REVIEWS_SUCCESS,
      types.LOAD_REVIEWS_FAILURE
    ],
    promise: client => client.get(`/api/reviews?vendor=`+getId(vendor)+`&page=`+page+`&offset=5`)
  };
}
