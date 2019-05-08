import url from 'url';
import { matchPath } from 'react-router-dom';

import Home from '../src/modules/home/Home';
import VendorDetail from '../src/modules/detailPage/detailPageComponent';

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
