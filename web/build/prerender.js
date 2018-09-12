const vuePrerender = require('vue-prerender');

vuePrerender('web/dist', {
  logLevel: 3,
  parseRouter: true,
  tidy: true,
  routerParams: {
    // @todo Inject IDs
    deputyId: [1, 2],
  },
});
