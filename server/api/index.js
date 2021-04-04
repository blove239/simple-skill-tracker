const routes = require('express').Router();
const userController = require('../controllers/userController/index');
const skillController = require('../controllers/skillController/index');

routes.get('/authorized', (req, res) => {
  res.send({ message: 'Secured Resource' });
});

routes.get('/users', userController.findUser);

routes.get('/skills', skillController.returnAllSkills);

routes.get('/skills/:skillId', skillController.returnOneSkill);

routes.post('/skills', skillController.createSkill);

routes.patch('/skills/:skillId', skillController.updateSkill);

routes.delete('/skills/:skillId', skillController.delete);

module.exports = routes;
