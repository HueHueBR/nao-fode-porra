const fs = require('fs');
const path = require('path');
const R = require('ramda');
const debug = require('./utils/debug');
const knexBuilder = require('knex');

// Pure functions
const transformRawDataIntoJson = buffer => JSON.parse(buffer);
const extractExpensesFromJsonData = jsonData => jsonData.DESPESA;
const sortExpensesByDate = expenses => R.sort(R.ascend(R.prop('datEmissao')), expenses);
const groupExpensesByDeputyNumber = R.groupBy(expense => expense.nuDeputadoId);
const extractDeputiesData = deputyExpensesMap => R.map(expense => expense, R.mapObjIndexed((expenses, deputyId) => {
  const l = R.last(expenses);

  return {
    id: l.nuDeputadoId,
    name: l.txNomeParlamentar,
    wallet: l.nuCarteiraParlamentar,
    party: l.sgPartido,

  };
}, deputyExpensesMap));

// Impure functions
const createSchema = (knex) => {
  return Promise.all([
    knex.schema.createTable('deputies', table => {
      table.string('id');
      table.string('name');
      table.string('wallet');
      table.string('party');
    }),
    knex.schema.createTable('expenses', table => {
      table.string('codLegislatura');
      table.string('datEmissao');
      table.string('ideDocumento');
      table.string('idecadastro');
      table.string('indTipoDocumento');
      table.string('nuCarteiraParlamentar');
      table.string('nuDeputadoId');
      table.string('nuLegislatura');
      table.string('numAno');
      table.string('numEspecificacaoSubCota');
      table.string('numLote');
      table.string('numMes');
      table.string('numParcela');
      table.string('numRessarcimento');
      table.string('numSubCota');
      table.string('sgPartido');
      table.string('sgUF');
      table.string('txNomeParlamentar');
      table.string('txtCNPJCPF');
      table.string('txtDescricao');
      table.string('txtDescricaoEspecificacao');
      table.string('txtFornecedor');
      table.string('txtNumero');
      table.string('txtPassageiro');
      table.string('txtTrecho');
      table.string('vlrDocumento');
      table.string('vlrGlosa');
      table.string('vlrLiquido');
      table.string('vlrRestituicao');
    }),
  ]);
};

async function fetchFile(file) {
  return new Promise((resolve, reject) => {
    debug(`Reading file "${file}"`);

    fs.readFile(file, {}, (err, buffer) => {
      debug(`Finished fetching "${file}" data.`);
      if (err) {
        debug(`Read got errors. (${err})`);

        return reject(err);
      }

      debug(`Got buffer for "${file}"!`);

      return resolve(buffer);
    });
  });
};

const storeDeputiesData = (knex, deputies) => knex.batchInsert(
  'deputies',
  Object.keys(deputies).map((key) => deputies[key]),
  100
);

const storeDeputiesExpenses = (knex, expenses) => knex.batchInsert('expenses', expenses, 30);

const firstYear = 2009;
const lastYear = 2018;

async function processFile(year) {
  const knex = knexBuilder({
    client: 'sqlite3',
    connection: {filename: `build/${year}.sqlite3`},
    // useNullAsDefault: true,
  });

  await createSchema(knex);

  const file = path.resolve(path.dirname(__filename), '..', 'build', `Ano-${year}.json`);
  const buffer = await fetchFile(file);
  const expenses = R.pipe(
    transformRawDataIntoJson,
    extractExpensesFromJsonData
  )(buffer);

  storeDeputiesData(knex, extractDeputiesData(groupExpensesByDeputyNumber(expenses)))
  .then(() => {
    storeDeputiesExpenses(knex, expenses)
    .then(() => {
      processFile(year+1);

      if (year === lastYear) {
        process.exit(0);
      }
    })
  })
}

processFile(firstYear);
