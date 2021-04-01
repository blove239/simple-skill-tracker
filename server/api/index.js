const routes = require('express').Router();
const userController = require('../controllers/userController/index');
const skillController = require('../controllers/skillController/index');

routes.get('/authorized', (req, res) => {
  res.send({ message: 'Secured Resource' });
});

routes.get('/users', userController.findUser);

routes.get('/skills', userController.returnSkills);

routes.get('/skills/:skillId', skillController.returnSkill);

routes.post('/skills', skillController.create);

routes.patch('/skills/:skillId', skillController.updateSkill);

routes.delete('/skills/:skillId', skillController.delete);

module.exports = routes;
