const routes = require('express').Router();
const userController = require('../controllers/userController/index');
const skillController = require('../controllers/skillController/index');

routes.get('/authorized', (req, res) => {
  res.send({ message: 'Secured Resource' });
});

routes.get('/users', userController.find);

routes.get('/skills', (req, res) => {
  res.send({ message: 'return all skills' });
});

routes.get('/skills/:skillid', (req, res) => {
  res.send({ message: 'returns a single skill and all its info' });
});

routes.post('/skills', skillController.create);

routes.patch('/skills', (req, res) => {
  res.send({ message: 'add new skill endpoint' });
});

routes.delete('/skills/:skillid', (req, res) => {
  res.send({ message: 'soft deletion of one skill' });
});

module.exports = routes;
