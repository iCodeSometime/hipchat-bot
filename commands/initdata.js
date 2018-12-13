const db = require('../shared/db_provider.js');

const fs = require('fs');

module.exports = {
  description: 'inserts test data',
  call: init_db,
  help: () => { return 'inserts test data' }
};

function init_db(args, res) {
  fs.readFile('./scripts/initial_data.sql', (err, data) => {
    if (err) throw err;
    db.run_sql(data.toString());
    res.sendMessage('data inserted successfully');
  });
}
