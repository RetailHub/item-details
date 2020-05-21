DROP DATABASE IF EXISTS itemdetails;
DROP TABLE IF EXISTS items;
CREATE DATABASE itemdetails;
\c itemdetails;

CREATE TABLE items (
  id SERIAL NOT NULL PRIMARY KEY,
  productName VARCHAR(50) NOT NULL,
  producer VARCHAR(50) NOT NULL,
  answeredQuestions INT NOT NULL,
  numberOfRatings INT NOT NULL,
  starPercentages JSON,
  price VARCHAR(50) NOT NULL,
  inStock BOOLEAN,
  productInfo text[]
);
