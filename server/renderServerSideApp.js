import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import {CriticalCSSProvider, StyleRegistry} from 'react-critical-css';


import App from '../src/App';
import configureStore from '../src/utils/configureStore';
import { fetchDataForRender } from './fetchDataForRender';
import { indexHtml } from './indexHtml';
import stats from '../build/react-loadable.json';

export const renderServerSideApp = (req, res) => {
  const { store } = configureStore({ logger: false });
  Loadable.preloadAll()
    .then(() => fetchDataForRender(req, store))
    .then(() => renderApp(req, res, store));
};

function renderApp(req, res, store) {
  const context = {};
  const modules = [];
  const styleRegistry = new StyleRegistry();
  const markup = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
        <CriticalCSSProvider registry={styleRegistry}>
          <App />
          </CriticalCSSProvider>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );

  const criticalCSS = styleRegistry.getCriticalCSS(); // insert this styles into result HTML
  console.log(criticalCSS);
    
  if (context.url) {
    res.redirect(context.url);
  } else {
    const fullMarkup = indexHtml({
      helmet: Helmet.renderStatic(),
      initialState: store.getState(),
      bundles: getBundles(stats, modules),
      criticalCSS,
      markup
    });
    const returnStatus = is404(modules) ? 404 : 200 ;
    res.status(returnStatus).send(fullMarkup);
  }
}


const is404 = (modules = []) => {
  return !!modules.find(moduleName => moduleName.indexOf('modules/notFound/NotFound') !== -1);
}