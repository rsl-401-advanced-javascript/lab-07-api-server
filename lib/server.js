'use strict';

const express = require('express');
const app = express();

let db = [];
app.use(express.json());

app.use( (req,res,next) => {
  console.log('LOG:', req.method, req.path);
  next();
});

app.get('/categories', (req,res,next) => {
  let count = db.length;
  let results = db;
  res.json({count,results});
});

app.get('/categories/:id', (req,res,next) => {
  let id = req.params.id;
  let record = db.filter((record) => record.id === parseInt(id));
  res.json(record[0]);
});


app.post('/categories', (req,res,next) => {
  let {name} = req.body;
  let record = {name};
  record.id = db.length + 1;
  db.push(record);
  res.json(record);
});

app.put('/categories/:id', (req,res,next) => {
  let recordIndex = db.findIndex(record => record.id === parseInt(req.params.id));
  db[recordIndex].name = req.body.name;
  let record = db.find(record => record.id === parseInt(req.params.id));
  res.json(record);
});

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

