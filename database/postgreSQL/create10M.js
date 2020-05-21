const faker = require('faker');
const fs = require('fs');

const createItems = fs.createWriteStream('../items.csv');
createItems.write('id | productName| producer | answeredQuestions | numberOfRatings | price | inStock | productInfo\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 1;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
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
      const productInfo = [faker.lorem.sentence(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph()];
      // for (let j = 0; j < Math.floor(Math.random() * 10) + 1; j += 1) {
      //   const detail = Math.random();
      //   if (detail > 0 && detail <= 1 / 3) {
      //     productInfo.push(faker.lorem.sentence());
      //   } else if (detail > 1 / 3 && detail <= 2 / 3) {
      //     productInfo.push(faker.lorem.paragraph());
      //   } else if (detail > 2 / 3 && detail <= 1) {
      //     productInfo.push(faker.lorem.paragraphs());
      //   }
      // }
      const data = `${id} | ${productName} | ${producer} | ${answeredQuestions} | ${numberOfRatings} | ${price} | ${inStock} | {${productInfo}} \n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(createItems, 'utf-8', () => {
  createItems.end();
});
