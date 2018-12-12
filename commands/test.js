const db = require('../shared/db_provider.js');

module.exports = {
  description: 'Just a test.',
  call: test,
  help: () => { return 'Just a test.' } // can we get more detailed..?
};



function test(args, res) {
  db.run_sql('SELECT table_schema,table_name FROM information_schema.tables;');
}
