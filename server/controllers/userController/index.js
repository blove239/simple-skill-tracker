const User = require('../../models/userModel/index');
const Skill = require('../../models/skillModel/index');

const userController = {
  find: async (req, res) => {
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    if (!userDoc) {
      userController.create(req, res);
    } else {
      userController.returnSkills(req, res);
    }
  },
  create: async (req, res) => {
    const newUser = new User({ authToken: req.user.sub });
    await newUser.save();
    userController.returnSkills(req, res);
  },
  addSkill: async (req, res, newSkill, userDoc) => {
    const tempUserDoc = userDoc;
    tempUserDoc.skills.push(newSkill);
    await tempUserDoc.save();
    userController.returnSkills(req, res);
  },
  returnSkills: async (req, res) => {
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .populate('skills')
      .exec();
    const userSkills = userDoc.skills
      .filter((skill) => !skill.isDeleted);
    res.json({ skills: userSkills });
  },
};

module.exports = userController;
