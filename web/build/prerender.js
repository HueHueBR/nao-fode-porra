const { resolve } = require('path');
const vuePrerender = require('vue-prerender');
const knexBuilder = require('knex');

const derivedDb = knexBuilder({
  client: 'sqlite3',
  connection: {filename: `build/derived.db`},
  useNullAsDefault: true,
});

derivedDb
  .select('id')
  .from('deputies')
  .then((res) => {
    const deputiesIds = res.map(row => row.id);

    vuePrerender('web/dist', {
      logLevel: 3,
      parseRouter: true,
      tidy: true,
      routerParams: {
        deputyId: deputiesIds,
      },
    });

    derivedDb.destroy();
  });
