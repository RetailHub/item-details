/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = require('../database/controllers');

const PORT = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../public')));

// eslint-disable-next-line spaced-comment
//CREATE
app.post('/items/', (req, res) => {
  // console.log(req.body);
  db.createItem(req.body, (err) => {
    if (err) {
      res.status(400);
      res.end();
    } else {
      console.log('item was created with id: ', req.body.id);
      res.status(201);
      res.end();
    }
  });
});

// eslint-disable-next-line spaced-comment
//READ
app.get('/items/:id', (req, res) => {
  db.getAll(req.params.id, (err, success) => {
    if (err) {
      console.log(err);
      res.sendStatus(404).end();
    } else {
      console.log('getAll success');
      res.status(200);
      res.send(success).end();
    }
  });
});

// eslint-disable-next-line spaced-comment
//DELETE ONE
app.delete('/items/:id', (req, res) => {
  db.deleteOne(req.params.id, (err, deleted) => {
    if (err) {
      console.log('unable to delete with error: ', err);
      res.sendStatus(404).send('cannot delete');
    } else {
      console.log('this id was deleted: ', deleted.id);
      res.status(200);
      res.send(deleted).end();
    }
  });
});

// eslint-disable-next-line spaced-comment
//UPDATE ONE
app.patch('/items/:id', (req, res) => {
  // console.log(req.body.price);
  db.updateOne(req.params.id, req.body.price, (err, updated) => {
    if (err) {
      console.log('unable to update with error: ', err);
      res.status(404).send('cannot delete');
    } else {
      console.log('this price was updated for: ', updated.id);
      res.status(204).send(updated);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}.`);
});
