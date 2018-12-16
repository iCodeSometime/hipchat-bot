const db = require('../../shared/db_provider.js');
const parser = require('../../shared/complex_arg_parser.js');
const _ = require('lodash');

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
  description: 'Adds a new agency.',
  call: add_agency,
  help: () => {
    return 'Adds an agency to the managed list.\n' +
           'The live environment will be added automatically.\n\n' +
           parser.help('/smartcop add agency', valid_options)
  }
};

function add_agency(args, res) {
  required_options = _.omitBy(valid_options, (val, key) => {
    return val.optional;
  });
  options = parser.parse(args, Object.keys(required_options));
  if (options.failed) {
    return res.sendMessage(options.fail_message);
  }
  console.log('options:\n' + JSON.stringify(options));
  let query, query_params;
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

