const { Client } = require('pg');

module.exports = {
  run_sql: run_sql
}
use_ssl = true;
// Easier than figuring out why psql won't allow ssl locally
if (process.env.dev_env) use_ssl = false;

async function run_sql(query) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: use_ssl
  });

  client.connect();
  ret = undefined;
  return client.query(query);
}
