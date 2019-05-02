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

const { PUBLIC_URL = '' } = process.env;
const compiler = webpack(config);

export const app = express();

app.use(compression());
app.use(helmet());

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

app.get('*', (req, res) => {
  // We use 'require' inside this handler function
  // so that when purgeCacheOnChange() (see above) runs we pull in the most recent code.
  // https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
  const { renderServerSideApp } = require('./renderServerSideApp');
  renderServerSideApp(req, res);
});
