import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { purgeCacheOnChange } from './purgeCacheOnChange';
import config from '../config/webpack.config.dev';

import bodyParser from 'body-parser';

const { PUBLIC_URL = '' } = process.env;
const compiler = webpack(config);

export const app = express();

app.use(compression());
app.use(helmet());

app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}));

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     baseUri: ["'self'"],
//     defaultSrc: ["'self'", '*.googleapis.com', 'maxcdn.bootstrapcdn.com', '*.fullstory.com', '*.analytics.js', '*.google.com', '*.google-analytics.com', '*.facebook.com'],
//     scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*.googleapis.com', 'maxcdn.bootstrapcdn.com', '*.google-analytics.com', '*.googletagmanager.com', '*.facebook.net', 'https://fullstory.com', '*.google.com'],
//     styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'cdnjs.cloudflare.com'],
//     imgSrc: ["'self'", 'data:', '*.facebook.com', '*.google.com', '*.google.co.in', '*.cloudfront.net', '*.google-analytics.com', '*.ahwanam.com'],
//     fontSrc: ["'self'",'data:', 'maxcdn.bootstrapcdn.com', 'cdnjs.cloudflare.com'],
//     connectSrc: ["'self'", '*.fullstory.com','https://api.ahwanam.com', 'https://qa.ahwanam.com', 'https://prod.ahwanam.com','*.google-analytics.com']
//   },
//   browserSniff: false
// }));

app.use(
  PUBLIC_URL,
  express.static(path.join(__dirname, '../build'), {
    maxage: '1 year'
  })
);

app.use(
  PUBLIC_URL,
  express.static(path.join(__dirname, '../public'), {
    maxage: '30 days'
  })
);

app.use(morgan('tiny'));

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    progress: true,
    stats: {
      colors: true,
      assets: true,
      chunks: false,
      modules: false,
      hash: false
    }
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 4000
  })
);
purgeCacheOnChange(path.join(__dirname, '../'));

app.post('/report-violation', function (req, res) {
  if (req.body) {
    console.log('CSP Violation: ', req.body)
  } else {
    console.log('CSP Violation: No data received!')
  }
  res.status(204).end()
});

app.get('*', (req, res) => {
  // We use 'require' inside this handler function
  // so that when purgeCacheOnChange() (see above) runs we pull in the most recent code.
  // https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
  const { renderServerSideApp } = require('./renderServerSideApp');
  renderServerSideApp(req, res);
});
