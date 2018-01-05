'use strict';

const path = require('path');
const DataHub = require('macaca-datahub');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const datahubProxyMiddle = require('datahub-proxy-middleware');

const isTest = process.env.NODE_ENV === 'test';

const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, 'data'),
  proxy: {
    '^/api': {
      hub: 'sample'
    }
  },
  showBoard: !isTest
};

const defaultDatahub = new DataHub({
  port: datahubConfig.port
});

module.exports = {
  entry: {
    index: path.join(__dirname, 'index.js'),
  },
  output: {
    path: path.join(__dirname, '/'),
    publicPath: '/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    })
  ],
  devServer: {
    before: app => {
      datahubProxyMiddle(app)(datahubConfig);
    },
    after: () => {
      defaultDatahub.startServer(datahubConfig).then(() => {
        console.log('datahub ready');
      });
    }
  }
};
