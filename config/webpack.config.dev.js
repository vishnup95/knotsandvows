const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Critters = require('critters-webpack-plugin');

const { getAppEnv } = require('./env');

const env = getAppEnv();
const { PUBLIC_URL = '' } = env.raw;
const resolvePath = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    resolvePath('../src/index.js')
  ],
  output: {
    path: resolvePath('../build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_URL + '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter
            },
            loader: 'eslint-loader'
          }
        ],
        include: resolvePath('../src')
      },
      {
        test: /\.(js|jsx)$/,
        include: resolvePath('../src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(scss|css)$/,
        exclude: [resolvePath('../src/styles')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['last 2 versions', 'not ie < 11'],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          'resolve-url-loader',
          'sass-loader',
          'import-glob-loader'
        ]
      },
      {
        test: /\.(scss|css)$/,
        include: [resolvePath('../src/styles')],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              localIdentName: '[local]--[hash:base64:5]',
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: ['last 2 versions', 'not ie < 11'],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          'resolve-url-loader',
          'sass-loader',
          'import-glob-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: resolvePath('../public'),
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(env.forWebpackDefinePlugin),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new LodashModuleReplacementPlugin(),
    new ErrorOverlayPlugin(),
    new ReactLoadablePlugin({
      filename: 'build/react-loadable.json'
    }),
    new HtmlWebpackPlugin(),
    new Critters({
      // optional configuration (see below)
    })
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
