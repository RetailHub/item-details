DROP DATABASE IF EXISTS itemdetails;
DROP TABLE IF EXISTS items;
CREATE DATABASE itemdetails;
\c itemdetails;

CREATE TABLE items (
  id SERIAL NOT NULL PRIMARY KEY,
  productName VARCHAR(150) NOT NULL,
  producer VARCHAR(150) NOT NULL,
  answeredQuestions INT NOT NULL,
  starPercentages VARCHAR(150),
  numberOfRatings INT NOT NULL,
  price VARCHAR(50) NOT NULL,
  inStock BOOLEAN,
  productInfo TEXT
);
