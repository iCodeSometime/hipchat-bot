const { Client } = require('pg');

module.exports = {
  run_sql: run_sql
}
use_ssl = true;
// Easier than figuring out why psql won't allow ssl locally
if (process.env.dev_env) use_ssl = false;

function run_sql(query) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: use_ssl
  });

  client.connect();

  client.query(query, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
