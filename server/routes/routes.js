const routes = require('express').Router();

routes.get('/authorized', (req, res) => {
  res.send({ message: 'Secured Resource' });
});

module.exports = routes;
