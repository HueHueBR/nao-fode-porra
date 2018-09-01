const { resolve } = require('path');
const { writeFileSync } = require('fs');
const numeral = require('numeral');
// load a locale
numeral.register('locale', 'br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  currency: {
    symbol: 'R$ '
  }
});

numeral.locale('br');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {filename: resolve(__dirname, '../build/raw.sqlite3')},
  useNullAsDefault: true,
});

const currentYear = (new Date()).getFullYear().toString();

knex.first(
  knex.raw('SUM(ABS(vlrLiquido)) as totalSpent')
)
.from('expenses')
.where(knex.raw("strftime('%Y', datEmissao)"), currentYear)
.then(result => {
  result.totalSpent = numeral(result.totalSpent).format('$0,0.00');
  const jsonDataObj = JSON.stringify(result);

  writeFileSync(
    resolve(__dirname, '../data/home.data.js'),
    `window.data=JSON.parse('${jsonDataObj}')`
  );

  knex.destroy();
});
