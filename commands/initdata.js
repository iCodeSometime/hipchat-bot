const db = require('../shared/db_provider.js');

const fs = require('fs');

// Hidden command. No help
module.exports = {
  call: init_db,
};

function init_db(args, res) {
  fs.readFile('./scripts/initial_data.sql', (err, data) => {
    if (err) throw err;
    db.run_sql(data.toString());
    res.sendMessage('data inserted successfully');
  });
}
