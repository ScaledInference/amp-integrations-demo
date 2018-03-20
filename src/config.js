// process args
const args = {};

process.argv.slice(2).forEach(kv => {
  const split = kv.split('=');

  let value = split[1];
  if (value && value.toLowerCase() == 'false') value = false;
  if (value === null || value === undefined || value === '' || value === 'true') value = true;

  args[split[0]] = value;
});


// config
const key = args['key'];
if (!key) throw('Project key is required to run tests.');

const domain = args['domain'] || 'https://amp.ai';
const apiPath = args['apiPath'] || '/api/core/v1/';
const port = args['port'] || '5150';

module.exports = { key, domain, apiPath, port};
