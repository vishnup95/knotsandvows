import { combineReducers } from 'redux';
import session from './session/sessionReducer';
import modal from './modal/modalReducer';
import { connectRouter } from 'connected-react-router';
import HomeReducer from '../modules/home/reducer';
import SampleReducer from '../modules/sample/reducer';

import { history } from '../utils/utilities';
import ProductsReducer from '../modules/products/reducer';
import TalkToAhwanamReducer from '../components/TalkToWeddingPlanner/reducer';
import VendorDetailReducer from '../modules/detailPage/reducer';
import CeremonyDetailReducer from '../modules/ceremonyDetail/reducer';
import WishListReducer from '../modules/wishlist/reducer';
import MetaDataReducer from './metaTags/reducer';

const appReducer = combineReducers({
  session,
  modal,
  router: connectRouter(history),
  home: HomeReducer,
  sample: SampleReducer,
  products: ProductsReducer,
  talkToAhwanam: TalkToAhwanamReducer,
  details: VendorDetailReducer,
  ceremonyDetails : CeremonyDetailReducer,
  wishlist : WishListReducer,
  metadata : MetaDataReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
