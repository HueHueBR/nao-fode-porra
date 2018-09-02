const { resolve } = require('path');

module.exports = {
  dataLoader: resolve(__dirname, './data-loader/data-loader.js'),
  dataInjector: resolve(__dirname, './data-injector/data-injector.js'),
};
