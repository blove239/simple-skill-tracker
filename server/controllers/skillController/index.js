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
  delete: async (req, res) => {
    const { skillId } = req.params;
    Skill.deleteOne({ _id: skillId }, (err) => {
      if (err) console.log(err);
    });

    userController.returnSkills(req, res);
  },
};

module.exports = skillController;
