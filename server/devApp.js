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
import SitemapGenerator from 'sitemap-generator';


const { PUBLIC_URL = '' } = process.env;
const compiler = webpack(config);

export const app = express();

app.use(compression());
app.use(helmet());

app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}));

app.use(helmet.contentSecurityPolicy({
  directives: {
    baseUri: ["'self'"],
    defaultSrc: ["'self'", '*.googleapis.com', 'maxcdn.bootstrapcdn.com', '*.fullstory.com', '*.analytics.js', '*.google.com', '*.google-analytics.com', '*.facebook.com', '*.doubleclick.net','*.purechat.com','*.secure.gravatar.com'],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", '*.googleapis.com', 'maxcdn.bootstrapcdn.com', '*.google-analytics.com', '*.googletagmanager.com', '*.facebook.net', 'https://fullstory.com', '*.google.com', '*.googleadservices.com', '*.doubleclick.net','*.purechat.com','*.secure.gravatar.com'],
    styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'cdnjs.cloudflare.com', '*.googleapis.com', 'fonts.googleapis.com','*.purechat.com','*.secure.gravatar.com'],
    imgSrc: ["'self'", 'data:', '*.facebook.com', '*.google.com', '*.google.co.in', '*.cloudfront.net', '*.google-analytics.com', '*.ahwanam.com', '*.doubleclick.net','*.purechat.com','*.secure.gravatar.com'],
    fontSrc: ["'self'",'data:', 'maxcdn.bootstrapcdn.com', 'cdnjs.cloudflare.com', 'fonts.gstatic.com','*.purechat.com','*.secure.gravatar.com'],
    connectSrc: ["'self'", '*.fullstory.com','https://api.ahwanam.com', 'https://qa.ahwanam.com', 'https://prod.ahwanam.com','*.google-analytics.com','*.purechat.com','*.secure.gravatar.com']
  },
  browserSniff: false
}));

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

// create generator
const generator = SitemapGenerator(process.env.APP_URL, {
  stripQuerystring: false,
  filepath: path.join(process.cwd(), 'sitemap.xml'),
  changeFreq: "always",
  lastMod: true,
  timeout:500000,
  listenerTTL: 30000,
  ignore: url => {
    // Prevent URLs from being added that contain `<pattern>`.
    return (url.indexOf('undefined') !== -1 || url.indexOf('login') !== -1)
  }
});

// start the crawler
//generator.start();
 
// register event listeners
generator.on('done', () => {
  // sitemaps created
  console.log("sitemaps created");

});

generator.on('error', (error) => {
  //console.log('error',error);
});

// start the crawler
if (process.env.NODE_ENV === 'production') {
  generator.start();
}

generator.on('add', (url) => {
  
});

app.get('/sitemap.xml', function(req, res, next) {
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', "max-age=0");
  res.sendFile(path.join(process.cwd(), 'sitemap.xml'))
});

app.get('/update-sitemap-xml', function(req, res, next) {
  generator.start();
  res.sendStatus(200);
});

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
