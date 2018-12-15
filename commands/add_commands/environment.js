const db = require('../../shared/db_provider.js');
const parser = require('../../shared/complex_arg_parser.js');

valid_options = {
  name: {
    example: 'test',
    description: 'The name used to refer to the environment'
  },
  acronym: {
    example: 'FHP',
    description: 'The acronym used by the agency'
  }
};

module.exports = {
  description: 'Adds a new item.',
  call: add_environment,
  help: () => {
    return 'Use this to add environments to an agency.\n' +
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
  db.run_sql('insert into environments(name, agency_fkey) values ' +
             '($1, (select uniquekey from agencies where acronym ilike $2));',
             [options.name, options.acronym])
    .then(sql_result => {
      if (sql_result.rowCount > 0) {
        db.run_sql('select * from environments where agency_fkey = ' +
                   '(select uniquekey from agencies where acronym ilike $1);',
                   [options.acronym]).then(result => {
                     message = 'Added successfully. ' + options.acronym +
                               'now has the following environments:\n';
                     result.rows.forEach(row => message += row.name + '\n');
                     res.sendMessage(message);
                   });
      } else {
        res.sendMessage('oops, something happend.\n' + options.acronym + ' ' +
                        options.name + ' was not created.');
      }
    }, (err) => res.sendMessage('there was an internal error:\n' + err));
}
