const cassandra = require('cassandra-driver');

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
    DROP TABLE IF EXISTS itemdetails.items`)
      .then(() => {
        console.log('Table dropped. Now creating table..');
      });
  })
  .then(() => {
    client.execute(`
      CREATE TABLE IF NOT EXISTS itemdetails.items (
        id INT,
        productName TEXT,
        producer TEXT,
        answeredQuestions INT,
        numberOfRatings INT,
        starPercentages TEXT,
        price TEXT,
        inStock BOOLEAN,
        productinfo list<text>,
        PRIMARY KEY (id)
      )
    `)
      .then(() => {
        console.log('Table created. Please run npm script c2c');
      });
  })
  .catch((err) => {
    console.error('Error connecting to Cassandra', err);
  });
