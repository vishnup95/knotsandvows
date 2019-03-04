import * as types from './constants';

export function fetchVendorDetails(category, vendor) {
  return {
    types: [
      types.LOAD_DETAILS,
      types.LOAD_DETAILS_SUCCESS,
      types.LOAD_DETAILS_FAILURE
    ],
    promise: client => client.get(`/api/details?type=`+category+`&vendor=`+vendor)
  };
}

export function fetchSimilarVendors(category, vendor) {
  return {
    types: [
      types.LOAD_SIMILAR_VENDORS,
      types.LOAD_SIMILAR_VENDORS_SUCCESS,
      types.LOAD_SIMILAR_VENDORS_FAILURE
    ],
    promise: client => client.get(`/api/similarvendors?type=`+category+`&vendor=`+vendor)
  };
}

export function fetchReviews(category, vendor, page) {
  return {
    types: [
      types.LOAD_REVIEWS,
      types.LOAD_REVIEWS_SUCCESS,
      types.LOAD_REVIEWS_FAILURE
    ],
    promise: client => client.get(`/api/reviews?type=`+category+`&vendor=`+vendor+`&page=`+page+`&offset=5`)
  };
}
