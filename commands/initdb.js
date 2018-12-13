const db = require('../shared/db_provider.js');

const fs = require('fs');

module.exports = {
  description: 'Initializes tables. Will delete existing content',
  call: init_db,
  help: () => { return 'Initializes tables. Will delete existing content' }
};

function init_db(args, res) {
  fs.readFile('./scripts/create_tables.sql', (err, data) => {
    if (err) throw err;
    db.run_sql(data.toString());
    res.sendMessage('databases created successfully');
  });
}
