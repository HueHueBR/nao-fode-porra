const { resolve } = require('path');
const webpack = require('webpack');
const { dataInjector, dataLoader } = require('./utils/custom-loaders');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const html = {
  test: /\.html$/,
  use: [
    { loader: 'file-loader', options: { name: '[name].html' } },
    'extract-loader',
    'html-loader',
    { loader: 'data-injector' },
    { loader: 'data-loader', options: { resolversPath: resolve(__dirname, 'resolvers') } },
  ],
};

const css = {
  test: /\.scss$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
};

module.exports = {
  mode: 'development',
  resolveLoader: {
    alias: {
      'data-loader': dataLoader,
      'data-injector': dataInjector,
    },
  },
  entry: {
    home: resolve(__dirname, 'src/home.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'dist/'),
  },
  module: {
    rules: [html, css],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' })
  ],
};
