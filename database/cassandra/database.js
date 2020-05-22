const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to Cassandra', err);
  } else {
    console.log('Successfully connected to Cassandra');
  }
});
