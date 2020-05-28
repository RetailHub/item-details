/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const promise = require('bluebird');

const options = {
  promiseLib: promise,
};

const client = require('pg-promise')(options);

const connection = {
  user: 'haidersyed',
  password: '',
  host: 'localhost',
  database: 'itemdetails',
  port: 5432,
};

const db = client(connection);

module.exports = {
  getOne(req, res) {
    // console.log('req from inside getOne: ', req);
    db.one(`SELECT * FROM items WHERE id = ${req}`)
      .then((result) => {
        // console.log(result);
        const parsedResult = {};
        parsedResult.id = result.id;
        parsedResult.producer = result.producer;
        parsedResult.price = result.price;
        parsedResult.productName = result.productname;
        parsedResult.answeredQuestions = result.answeredquestions;
        parsedResult.starPercentages = JSON.parse(result.starpercentages.replace(/'/g, '"'));
        parsedResult.numberOfRatings = result.numberofratings;
        parsedResult.inStock = result.instock;
        parsedResult.productInfo = result.productinfo.replace(/[[\]']+/g, '').split(',');
        res.status(200).send(parsedResult);
        res.end();
      })
      .catch((err) => {
        console.error('unable to get result: ', err);
        res.status(400).end();
      });
  },
  createOne(req, res) {
    // console.log('req from inside createOne: ', req);
    let {
      id,
      productName,
      producer,
      answeredQuestions,
      starPercentages,
      numberOfRatings,
      price,
      inStock,
      productInfo,
    } = req;

    starPercentages = JSON.stringify(starPercentages);
    productInfo = JSON.stringify(productInfo);

    // eslint-disable-next-line no-template-curly-in-string
    db.none('INSERT INTO items (id, productname, producer, answeredquestions, starpercentages, numberofratings, price, instock, productinfo) VALUES (${id}, ${productName}, ${producer}, ${answeredQuestions}, ${starPercentages}, ${numberOfRatings}, ${price}, ${inStock} , ${productInfo})', req)
      .then(() => {
        console.log('successfully added item with id: ', `${id}`);
        res.status(200).end();
      })
      .catch((err) => {
        console.error('unable to create one: ', err);
        res.status(400).end();
      });
  },
};
