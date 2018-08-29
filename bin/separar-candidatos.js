const fs = require('fs');
const path = require('path');
const R = require('ramda');
const debug = require('./utils/debug');

const DEBUG_MODE = true;
const file = process.argv[2] || '';

if (fs.existsSync(file) === false) {
  console.error(`File ${file} does not exist! Exiting...`);
  process.exit(0);
}

// Pure functions
const transformRawDataIntoJson = buffer => JSON.parse(buffer);
const extractExpensesFromJsonData = jsonData => jsonData.DESPESA;
const sortExpensesByDate = expenses => R.sort(R.ascend(R.prop('datEmissao')), expenses);
const groupExpensesByDeputyNumber = R.groupBy(expense => expense.nuDeputadoId);
const extractDeputiesData = deputyExpensesMap => R.mapObjIndexed((expenses, deputyId) => {
  const l = R.last(expenses);

  return {
    id: l.nuDeputadoId,
    name: l.txNomeParlamentar,
    wallet: l.nuCarteiraParlamentar,
    party: l.sgPartido,

  };
}, deputyExpensesMap);

// Impure functions
const fetchFile = (file) => {
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

const storeDeputiesData = deputies => {
  const destination = path.resolve(path.dirname(__filename), '..', 'build', 'deputies.json');
  
  return new Promise(resolve => {
    debug('Saving deputies data...');

    const json = JSON.stringify(deputies);
    fs.writeFile(destination, json, (err) => {
      if (err) {
        debug(`Could not save deputies data: "${err}".`);
        throw err;
      }

      debug('Deputies data saved!');
      resolve();
    });
  });
};

const storeDeputiesExpenses = deputyExpensesMap => {
  const destination = path.resolve(path.dirname(__filename), '..', 'build', 'deputy-expenses.json');

  return new Promise(resolve => {
    debug('Saving expenses map...');

    const json = JSON.stringify(deputyExpensesMap);
    fs.writeFile(destination, json, (err) => {
      if (err) {
        debug(`Could not save expenses map: "${err}".`);
        throw err;
      }

      debug('Expenses map saved!');
      resolve();
    });
  });
};

// Processing file
fetchFile(file)
  .then(
    // { deputyId: expenses[] }
    R.pipe(
      transformRawDataIntoJson,
      extractExpensesFromJsonData,
      sortExpensesByDate,
      groupExpensesByDeputyNumber,
    )
  )
  .then(
    deputyExpensesMap => Promise.all([
      storeDeputiesData(extractDeputiesData(deputyExpensesMap)),
      storeDeputiesExpenses(deputyExpensesMap),
    ])
  );

