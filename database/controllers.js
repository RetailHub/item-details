/* eslint-disable no-console */
const Item = require('./database');

const getAll = (itemId, callback) => {
  Item.find({ id: itemId }, (err, item) => {
    console.log('itemId : ', itemId, ' ', item);
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

const updateOne = (itemId, newPrice, callback) => {
  Item.findOneAndUpdate({ id: itemId },
    { $set: { price: newPrice } }, { new: true, upsert: true }, (err, item) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, item);
    });
};

module.exports = {
  getAll,
  createItem,
  deleteOne,
  updateOne,
};
