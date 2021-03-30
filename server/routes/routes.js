const routes = require('express').Router();
const userController = require('../controllers/userController');

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

routes.post('/skills', (req, res) => {
  res.send({ message: 'create a new skill with post body (name of skill) as params including the user id' });
});

routes.patch('/skills', (req, res) => {
  res.send({ message: 'add new skill endpoint' });
});

routes.delete('/skills/:skillid', (req, res) => {
  res.send({ message: 'soft deletion of one skill' });
});

module.exports = routes;
