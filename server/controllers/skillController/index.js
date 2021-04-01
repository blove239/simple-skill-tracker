const Skill = require('../../models/skillModel/index');
const User = require('../../models/userModel/index');
const userController = require('../userController');

const skillController = {
  create: async (req, res) => {
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    const newSkill = new Skill({
      createdBy: userDoc._id,
      hours: 0,
      isDeleted: false,
      title: req.body.skill,
    });
    await newSkill.save();
    userController.addSkill(req, res, newSkill, userDoc);
  },
};

module.exports = skillController;
