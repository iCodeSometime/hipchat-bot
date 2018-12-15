const db = require('../../shared/db_provider.js');
const parser = require('../../shared/complex_arg_parser.js');

valid_options = {
  name: {
    example: 'Florida Fish and Wildlife',
    description: 'The name of the agency'
  },
  acronym: {
    example: 'FWC',
    description: 'The acronym used by the agency'
  },
  parent: {
    example: 'FHP',
    description: '(optional) The acronym of the parent agency.',
    optional: true
  }
};

module.exports = {
  description: 'Adds a new item.',
  call: add_environment,
  help: () => {
    return 'Adds an environment to an agency.\n' +
           'There is no need to add the live environment.\n\n' +
           parser.help('/smartcop add environments', valid_options)
  }
};

function add_environment(args, res) {
  options = parser.parse(args, Object.keys(valid_options));
  if (options.failed) {
    return res.sendMessage(options.fail_message);
  }
  console.log('options:\n' + JSON.stringify(options));
  if (options.hasOwnProperty('parent')) {
    query = 'insert into agencies(name, acronym, parent_fkey) values ' +
               '($1, $2, (select uniquekey from agencies where acronym ilike $3))';
    query_params = [options.name, options.acronym, options.parent];
  } else {
    query = 'insert into agencies(name, acronym) values ($1, $2)'
    query_params = [options.name, options.acronym]
  }
  db.run_sql(query, query_params)
    .then(sql_result => {
      if (sql_result.rowCount > 0) {
        res.sendMessage('Added successfully');
      } else {
        res.sendMessage('oops, something happend.\n' + options.acronym + ' ' +
                        options.name + ' was not created.');
      }
    }, (err) => res.sendMessage('there was an internal error:\n' + err));
}

