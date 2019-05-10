import url from 'url';
import { matchPath } from 'react-router-dom';

import Home from '../src/modules/home/Home';
import VendorDetail from '../src/modules/detailPage/detailPageComponent';
import CeremonyDetail from '../src/modules/ceremonyDetail/CeremonyDetail';
import VendorListing from '../src/modules/products/Products';

const ROUTES_THAT_FETCH_DATA = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/vendor-detail/:category_name/:vendor_name',
    component: VendorDetail,
    exact: true
  },
  {
    path: '/ceremonies/:ceremony_name',
    component: CeremonyDetail,
    exact: true
  },
  {
    path: '/categories/:category_name',
    component: VendorListing,
    exact: true
  }
];

export const fetchDataForRender = (req, store) => {
  const promises = [];

  ROUTES_THAT_FETCH_DATA.some(route => {
    const match = matchPath(url.parse(req.url).pathname, route);
    if (match) {
      const promise =
        route.component &&
        route.component.fetchData &&
        route.component.fetchData(store, match, req);
      promises.push(promise);
    }
    return match;
  });

  return Promise.all(promises).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('fetchDataForRender: ',err);
    return Promise.resolve(null);
  });
};
