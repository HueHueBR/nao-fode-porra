
const fetchVariables = template =>
  template
    .match(/[\{]{2}[a-zA-Z0-9_\.]+[\}]{2}/g)
    .map(item => item.replace(/[\{\}]/g, ''));

const replaceVariables = (template, variables, data) => {
  return variables.reduce((result, name) => {
    const expr = RegExp('\{\{#name\}\}'.replace('#name', name));
    const value = name in data ? data[name] : '';

    return result.replace(expr, value || '');
  }, template);
};

module.exports = function dataInjector(source) {
  const { data, template } = source;
  const variables = fetchVariables(template);

  return variables.reduce((result, name) => {
    const expr = RegExp('\{\{#name\}\}'.replace('#name', name));
    const value = name in data ? data[name] : '';

    return result.replace(expr, value || '');
  }, template);
};
