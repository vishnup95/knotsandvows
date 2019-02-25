import * as types from './constants';
export function verifyEmail(code, email) {
  return {
    types: [
      types.LOAD_VERIFY_EMAIL,
      types.LOAD_VERIFY_EMAIL_SUCCESS,
      types.LOAD_VERIFY_EMAIL_FAILURE
    ],
    promise: client => client.get(`/api/UserAuth/verify?activation_code=`+code+"&email="+email)
  };
}
