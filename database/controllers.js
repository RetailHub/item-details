/* eslint-disable no-console */
const Item = require('./database');

const getAll = (itemId, callback) => {
  Item.find({ id: itemId }, (err, item) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, item[0]);
    }
  });
};

const createItem = function (obj, callback = () => { }) {
  const item = new Item(obj);
  item.save((err) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, obj);
    }
  });
};

const deleteOne = (itemId, callback) => {
  Item.findOneAndDelete({ id: itemId }, (err, query) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    return callback(null, query);
  });
};

module.exports = {
  getAll,
  createItem,
  deleteOne,
};
