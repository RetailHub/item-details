const cassandra = require('cassandra-driver');
const path = require('path');

const itemdetails = path.join(__dirname, '../items2.csv');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
});

client.connect()
  .then(() => {
    console.log('Successfully connected to Cassandra');
  })
  .then(() => {
    client.execute(`
    CREATE KEYSPACE IF NOT EXISTS itemdetails WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1}`);
    console.log('Keyspace created. Now creating items table..');
  })
  .then(() => {
    client.execute(`
    DROP TABLE IF EXISTS itemdetails.items`);
    console.log('Table dropped. Now creating table..');
  })
  .then(() => {
    client.execute(`
      CREATE TABLE IF NOT EXISTS itemdetails.items (
        id INT,
        productName TEXT,
        producer TEXT,
        answeredQuestions INT,
        numberOfRatings INT,
        price TEXT,
        inStock BOOLEAN,
        PRIMARY KEY (id)
      )
    `);
    console.log('Table created. Now seeding table..');
  })
  .then(() => {
    console.log('filepath is: ', itemdetails);
    client.execute("COPY itemdetails.items (id, productName, producer, answeredQuestions, numberOfRatings, price, inStock) from '/Users/haidersyed/github/hrr45-sdc/component/item-details/database/items2.csv' WITH DELIMITER = '|' AND HEADER = TRUE;");
    console.log('Seeding completed');
  })
  .catch((err) => {
    console.error('Error connecting to Cassandra', err);
  });
