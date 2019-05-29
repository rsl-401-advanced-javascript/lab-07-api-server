'use strict';

const Category = require('./categories');
const jsdoc = require('jsdoc');
const express = require('express');
const app = express();

let db = [];
app.use(express.json());

app.use( (req,res,next) => {
  console.log('LOG:', req.method, req.path);
  next();
});

/** The get/categories route returns all of the categories */
app.get('/categories', (req,res,next) => {
  let count = db.length;
  let results = db;
  res.json({count,results});
});

/** The get/categories/:id route returns the specified category if it exists */
app.get('/categories/:id', (req,res,next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});

/** The post/categories route creates a new category object and saves it to db */
app.post('/categories', (req,res,next) => {
  let record = new Category(req.body.name);
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
});

/** The put/categories/:id changes the name of the specified category if it exists */
app.put('/categories/:id', (req,res,next) => {
  let record = new Category(req.body.name);
  let recordIndex = db.findIndex(record => record.id === parseInt(req.params.id));
  db[recordIndex].name = record.name;
  record = db.find(record => record.id === parseInt(req.params.id));
  res.json(record);
});

/** The delete/categories/:id deletes the specified category from db if it exists */
app.delete('/categories/:id', (req,res,next) => {
  let recordIndex = db.findIndex(record => record.id === parseInt(req.params.id));
  delete db[recordIndex];
  res.send({ message: 'Successfully deleted category' });
});

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};

