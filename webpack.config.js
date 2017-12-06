const path = require('path');
const datahub = require('macaca-datahub');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const datahubProxyMiddle = require('datahub-proxy-middleware');

const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, 'data'),
  proxy: {
    '^/api': {
      hub: 'sample',
    },
  },
  showBoard: true
};

const defaultDatahub = new datahub({
  port: datahubConfig.port
});

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
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
}
