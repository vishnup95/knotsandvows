/* eslint-disable no-console */
require('dotenv').config()
require('@babel/register')({
  plugins: [
    [
      'css-modules-transform',
      {
        camelCase: true,
        extensions: ['.css', '.scss'],
        generateScopedName: '[local]--[hash:base64:5]'
      }
    ],
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node'
  ]
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const {
  choosePort,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const { app } = require('../server/devApp');

const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

choosePort(HOST, DEFAULT_PORT).then(port => {
  if (!port) {
    return;
  }

  const urls = prepareUrls('http', HOST, port);

  app.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }

    if (isInteractive) {
      clearConsole();
    }

    console.log(
      chalk.blue(`
        * Running locally at ${urls.localUrlForBrowser}
        * Running on your network at ${urls.lanUrlForConfig}:${port}
      `),
      chalk.gray(`
        Starting dev server...
      `)
    );

    openBrowser(urls.localUrlForBrowser);
  });
});
