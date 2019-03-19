// import { hideLoader } from '../../modules/app/actions';
// import { updateUser } from '../../modules/auth/actions';
import { SUCCESS_DEFAULT, FAILURE_DEFAULT } from '../constants';
import { isLoggedIn } from './utilities';

export default function clientMiddleware(client) {
  
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }
      client.defaults.headers = authHeader();
      // dispatch(showLoadingIndicator());
      const [
        REQUEST,
        SUCCESS = SUCCESS_DEFAULT,
        FAILURE = FAILURE_DEFAULT
      ] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise(client);
      actionPromise
        .then(
          result => {
            //   dispatch(hideLoader());
            if (result && result.data && result.data.status && result.data.status == true) {
              next({ ...rest, result, type: SUCCESS });
            }else  if (result && result.data && result.data.message) {
              let error = {
                  message: result.data.message
              }
              next({ ...rest, error, type: FAILURE });
            }else {  
              let error = {
                message: "Unexpected error occured, try again later"
              }           
              next({ ...rest, error, type: FAILURE });
            }
          },
          error => {
            //   dispatch(hideLoader());
            next({ ...rest, error, type: FAILURE });
          }
        )
        .catch(error => {
          // dispatch(hideLoader());
          // eslint-disable-next-line no-console
          console.error('MIDDLEWARE ERROR:', error);
          // next({...rest, error, type: FAILURE});
        });

      return actionPromise;
    };
  };
}

export function authHeader() {
  // return authorization header with basic auth credentials
  if (isLoggedIn()) {
       return { 'Authorization': window.localStorage.getItem('token') };
  } else {
      return {};
  }
}
