const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

require('dotenv').config({ path: './.env' });

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  if (config.devServer) {
    config.devServer.client.overlay = false;
  }
  if (!config.devServer) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        publicPath: '/',
        template: path.resolve(__dirname, './src/index.html'),
        scriptLoading: 'blocking',
      })
    );
  }
  return config;
});
