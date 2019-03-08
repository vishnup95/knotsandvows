import { combineReducers } from 'redux';
import session from './session/sessionReducer';
import modal from './modal/modalReducer';
import { connectRouter } from 'connected-react-router';
import HomeReducer from '../modules/home/reducer';
import SampleReducer from '../modules/sample/reducer';

import { history } from '../utils/utilities';
import ProductsReducer from '../modules/products/reducer';
import VerifyEmailReducer from '../modules/verifyEmail/reducer';
import TalkToAhwanamReducer from '../components/TalkToWeddingPlanner/reducer';
import VendorDetailReducer from '../modules/detailPage/reducer';
import CeremonyDetailReducer from '../modules/ceremonyDetail/reducer';

const appReducer = combineReducers({
  session,
  modal,
  router: connectRouter(history),
  home: HomeReducer,
  sample: SampleReducer,
  verifyEmail : VerifyEmailReducer,
  products: ProductsReducer,
  talkToAhwanam: TalkToAhwanamReducer,
  details: VendorDetailReducer,
  ceremonyDetails : CeremonyDetailReducer

});

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
