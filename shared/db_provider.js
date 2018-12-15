const { Client } = require('pg');

module.exports = {
  run_sql: run_sql
}
use_ssl = true;
// Easier than figuring out why psql won't allow ssl locally
if (process.env.dev_env) use_ssl = false;

async function run_sql(query, parameters) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: use_ssl
  });

  await client.connect();

  let ret = undefined;
  if (parameters) {
    ret =  await client.query(query, parameters);
  } else {
    ret =  await client.query(query);
  }
  await client.end();
  
  return ret;
}
