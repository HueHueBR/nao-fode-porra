const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader'],
};

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src', 'home.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '..'),
  },
  module: {
    rules: [pug],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(['js', 'css']),
    new HtmlWebpackPlugin({
      inject: false,
      test: /\.pug$/,
      template: path.resolve(__dirname, 'views', 'home', 'index.pug'),
    }),
  ],
};
