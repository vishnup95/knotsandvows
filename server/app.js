import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

const { PUBLIC_URL = '' } = process.env;
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

app.get('*', (req, res) => {
  // We use 'require' inside this handler function
  // so that when purgeCacheOnChange() (see above) runs we pull in the most recent code.
  // https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e
  const { renderServerSideApp } = require('./renderServerSideApp');
  renderServerSideApp(req, res);
});
