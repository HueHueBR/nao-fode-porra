const vuePrerender = require('vue-prerender');

vuePrerender('dist', {
  logLevel: 3,
  parseRouter: true,
  tidy: true,
  routerParams: {
    // @todo Inject IDs
    id: [1, 2],
  },
});
