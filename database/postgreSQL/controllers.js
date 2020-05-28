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
        // console.log('this is parsed result: ', parsedResult);
        res.status(200).send(parsedResult);
      })
      .catch((err) => console.error('unable to get result: ', err));
  },
  createOne(req, res) {
    // console.log('req from inside createOne: ', req.body);
    const {
      id,
      // eslint-disable-next-line no-unused-vars
      productName,
      // eslint-disable-next-line no-unused-vars
      producer,
      // eslint-disable-next-line no-unused-vars
      answeredQuestions,
      // eslint-disable-next-line no-unused-vars
      starPercentages,
      // eslint-disable-next-line no-unused-vars
      numberOfRatings,
      // eslint-disable-next-line no-unused-vars
      price,
      // eslint-disable-next-line no-unused-vars
      inStock,
      productInfo,
    } = req.body;

    req.body.starPercentages = JSON.stringify(starPercentages).replace(/"/g, "'");
    req.body.productInfo = JSON.stringify(productInfo);

    // eslint-disable-next-line no-template-curly-in-string
    db.none('INSERT INTO items (id, productname, producer, answeredquestions, starpercentages, numberofratings, price, instock, productinfo) VALUES (${id}, ${productName}, ${producer}, ${answeredQuestions}, ${starPercentages}, ${numberOfRatings}, ${price}, ${inStock} , ${productInfo})', req.body)
      .then(() => {
        console.log('successfully added item with id: ', `${id}`);
        res.status(200);
      })
      .catch((err) => console.error('unable to create one: ', err));
  },
};
