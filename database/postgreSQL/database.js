/* eslint-disable no-console */
const { Pool } = require('pg');
const path = require('path');

const pool = new Pool({
  user: 'haidersyed',
  password: '',
  host: 'localhost',
  database: 'itemdetails',
  port: '5432',
});

const itemDetails = path.join(__dirname, '../items.csv');

pool.connect()
  .then(() => console.log('Importing csv'))
  .then(() => pool.query(`COPY items FROM '${itemDetails}' WITH DELIMITER '|' CSV HEADER`))
  .catch((err) => console.error('ERROR: ', err));
