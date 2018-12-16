const db = require('../../shared/db_provider.js');
const parser = require('../../shared/complex_arg_parser.js');

valid_options = {
  name: {
    example: 'Florida Fish and Wildlife',
    description: 'The name of the agency'
  }
};

module.exports = {
  description: 'Adds a new product.',
  call: add_product,
  help: () => {
    return 'Adds a product to the managed list.\n' +
           parser.help('/smartcop add product', valid_options)
  }
};

function add_product(args, res) {
  options = parser.parse(args, Object.keys(valid_options));
  if (options.failed) {
    return res.sendMessage(options.fail_message);
  }
  console.log('options:\n' + JSON.stringify(options));
  let query = 'insert into products(name) values ($1)'
  let query_params = [options.name]
  
  db.run_sql(query, query_params)
    .then(sql_result => {
      if (sql_result.rowCount > 0) {
        let query = 'select name from products';
        db.run_sql(query).then(result => {
          message = 'Added successfully.\n Current products are:\n';
          result.rows.forEach(row => message += row.name + '\n');
          res.sendMessage(message);
        });
      } else {
        res.sendMessage('oops, something happend.\n' + options.acronym + ' ' +
                        options.name + ' was not created.');
      }
    }, (err) => res.sendMessage('there was an internal error:\n' + err));
}
