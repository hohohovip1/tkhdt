const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const University = require("./obj/university");
const UList = require("./obj/list");
const uList = new UList();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/list', (req, res) => {
  let list = uList.getData();
  res.json(list);
});
app.post('/api/by-name', (req, res) => {
  console.log(req.body.name);
  let list = uList.findByName(req.body.name);
  res.json(list);
});

app.delete('/api/delete/:uID', (req, res) => {
  uList.delete(Number(req.params.uID));
  res.status(200).end();
});

app.post('/api/by-id', (req, res) => {
  console.log(req.body.id);
  let list = uList.findSchool("id", req.body.id);
  res.json(list);
});

app.put('/api/edit', (req, res) => {
  var {id, ...value} = req.body;
  uList.change(id, value);
  res.json({status: 200})
});

app.post('/api/add-new', (req, res) => {
  console.log(req.body);
  var {name, fullName, address, year} = req.body;
  let u = new University(name, fullName,  address, year);
  uList.addSchool(u);
  res.json({status: 200})
});

app.post('/api/by-year', (req, res) => {
  console.log(req.body);
  let list = uList.schoolAge(req.body.year);
  res.json(list);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
