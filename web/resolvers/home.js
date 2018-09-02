const path = require('path');
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

const currentYear = (new Date()).getFullYear().toString();

module.exports = {
  resolve() {
    const knex = require('knex')({
      client: 'sqlite3',
      connection: {filename: path.resolve(__dirname, '../../build/raw.db')},
      useNullAsDefault: true,
    });

    return new Promise(resolve => {
      knex.first(
        knex.raw('SUM(ABS(vlrLiquido)) as totalSpent')
      )
      .from('expenses')
      .where(knex.raw("strftime('%Y', datEmissao)"), currentYear)
      .then(result => {
        result.totalSpent = numeral(result.totalSpent).format('$0,0.00');
        knex.destroy(() => resolve(result));
      });
    });
  }
};
