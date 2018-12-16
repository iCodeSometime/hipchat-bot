const db = require('../../shared/db_provider.js');
const parser = require('../../shared/complex_arg_parser.js');

valid_options = {
  product: {
    example: 'Jail',
    description: 'The name of the product.'
  },
  version: {
    example: '9.13.0.128',
    description: 'The version string for a release.'
  }
};

module.exports = {
  description: 'Adds a new release.',
  call: add_release,
  help: () => {
    return 'Adds a release to the managed list.\n' +
           parser.help('/smartcop add release', valid_options)
  }
};

function add_release(args, res) {
  options = parser.parse(args, Object.keys(valid_options));
  if (options.failed) {
    return res.sendMessage(options.fail_message);
  }
  console.log('options:\n' + JSON.stringify(options));
  version = options.version.split('.');
  if (version.length != 4) {
    return res.sendMessage('The version string is not valid.\n' +
                    'Make sure you include the build number');
  }
  [
    options.major,
    options.minor,
    options.patch,
    options.build
  ] = version;
  let query = 'insert into releases(major, minor, patch, build, product_fkey)' +
              'values ($1, $2, $3, $4, ' +
              '(select uniquekey from products where name ilike $5))';
  let query_params = [
    options.major, options.minor, options.patch, options.build, options.product
  ]
  
  db.run_sql(query, query_params)
    .then(sql_result => {
      if (sql_result.rowCount > 0) {
        let query = "select format('%s.%s.%s.%s', major, minor, patch, build)" +
                    'as version_string from releases where product_fkey = ' +
                    '(select uniquekey from products where name ilike $1)';
        let query_params = [options.product];
        db.run_sql(query, query_params).then(result => {
          message = 'Added successfully.\n' +
                    options.product + 'now has the following versions:\n'
          result.rows.forEach(row => message += row.version_string + '\n');
          res.sendMessage(message);
        });
      } else {
        res.sendMessage('oops, something happend.\n' + options.acronym + ' ' +
                        options.name + ' was not created.');
      }
    }, (err) => res.sendMessage('there was an internal error:\n' + err));
}
