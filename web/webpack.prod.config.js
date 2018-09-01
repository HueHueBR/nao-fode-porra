const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader'],
};

const sass = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
  ],
};

module.exports = {
  mode: 'production',
  entry: {
    home: path.resolve(__dirname, 'src/home.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '..'),
  },
  module: {
    rules: [pug, sass],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      test: /\.pug$/,
      template: path.resolve(__dirname, 'views/home/index.pug'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunckFilename: 'css/[id].css',
    }),
  ],
};
