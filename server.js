const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/index');
const User = require('./db/User');

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html')));

app.get('/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.get('/users/ranked', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

app.post('/users', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});

app.put('/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

app.delete('/users/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.use((error, req, res, next) => {
  console.log(error);
  console.log(Object.keys(error));
  let errors = [error];
  if (error.errors) {
    errors = error.errors.map(_error => _error.message);
  } else if (error.original) {
    errors = [error.original.message];
  }
  res.status(error.status || 500).send({ errors });
});

app.listen(port, () => console.log(`listening on port ${port}`));

syncAndSeed();
