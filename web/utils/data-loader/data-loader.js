const { pipe } = require('ramda');
const { resolve } = require('path');
const cheerio = require('cheerio');
const { getOptions } = require('loader-utils');

const resolveData = (resolverName, options) => {
  const resolver = require(resolve(options.resolversPath, resolverName));

  return resolver.resolve();
};

const apply = (source, options) => {
  const $ = cheerio.load(source, { decodeEntities: false });
  const resolverPlaceholder = $('[data-resolver]');
  resolverPlaceholder.remove();

  return new Promise(resolve => {
    if (resolverPlaceholder.length === 0) {
      return resolve({
        template: source,
        data: {},
      });
    }

    resolveData(
      resolverPlaceholder.attr('data-resolver'),
      options
    )
    .then(data => {
      return resolve({
        template: $.html(),
        data: data,
      });
    });
  });
};

module.exports = function dataLoader(source) {
  const callback = this.async();
  const options = getOptions(this);

  return apply(source, options)
    .then(modifiedSource => callback(null, modifiedSource))
    .catch(err => console.error(err));
};
