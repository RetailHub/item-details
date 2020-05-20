/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connection is open');
});

const itemDetailsSchema = new mongoose.Schema({
  id: Number,
  productName: String,
  producer: String,
  answeredQuestions: Number,
  numberOfRatings: Number,
  starPercentages: {
    one: Number,
    two: Number,
    three: Number,
    four: Number,
    five: Number,
  },
  price: Number,
  inStock: Boolean,
  productInfo: [],
});

const Item = mongoose.model('Item', itemDetailsSchema);

module.exports = Item;
