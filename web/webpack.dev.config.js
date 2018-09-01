const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader'],
};

const img = {
  test: /\.(png|jpg|gif|svg)$/,
  exclude: [
    path.resolve(__dirname, '../node_modules'),
  ],
  use: {
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[ext]',
    },
  },
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
  mode: 'development',
  entry: {
    home: path.resolve(__dirname, 'src/home.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '..'),
  },
  module: {
    rules: [pug, sass, img],
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
