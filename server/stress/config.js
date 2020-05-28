/* eslint-disable no-param-reassign */
const faker = require('faker');

module.exports = {
  randomId: (userContext, events, done) => {
    const id = Math.floor(Math.random() * 10000001);
    userContext.vars.id = id;
    return done();
  },
  randomItem: (userContext, events, done) => {
    const id = Math.floor(Math.random() * 10000001);
    const productName = faker.commerce.productName();
    const producer = faker.company.companyName();
    const answeredQuestions = Math.floor(Math.random() * 100);
    const price = (10000 * Math.random()).toFixed(2);
    const inStock = Math.random() > 0.5;
    const fives = Math.floor(Math.random() * 100);
    const fours = Math.floor(Math.random() * 100);
    const threes = Math.floor(Math.random() * 100);
    const twos = Math.floor(Math.random() * 100);
    const ones = Math.floor(Math.random() * 100);
    const starPercentages = {
      one: ones,
      two: twos,
      three: threes,
      four: fours,
      five: fives,
    };

    const numberOfRatings = ones + twos + threes + fours + fives;
    const productInfo = [faker.lorem.sentence(), faker.lorem.paragraph(), faker.lorem.paragraph()];

    userContext.vars.id = id;
    userContext.vars.productName = productName;
    userContext.vars.producer = producer;
    userContext.vars.answeredQuestions = answeredQuestions;
    userContext.vars.price = price;
    userContext.vars.inStock = inStock;
    userContext.vars.starPercentages = starPercentages;
    userContext.vars.numberOfRatings = numberOfRatings;
    userContext.vars.productInfo = productInfo;
    return done();
  },
};
