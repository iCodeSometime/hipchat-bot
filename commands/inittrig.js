const db = require('../shared/db_provider.js');

const fs = require('fs');

module.exports = {
  description: 'installs triggers',
  call: init_db,
  help: () => { return 'installs triggers' }
};

function init_db(args, res) {
  fs.readFile('./scripts/triggers.sql', (err, data) => {
    if (err) throw err;
    db.run_sql(data.toString());
    res.sendMessage('triggers created successfully');
  });
}
