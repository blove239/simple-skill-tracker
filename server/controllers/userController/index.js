const User = require('../../models/userModel/index');

const userController = {
  addSkill: async (req, res, newSkill, userDoc) => {
    const tempUserDoc = userDoc;
    tempUserDoc.skills.push(newSkill);
    await tempUserDoc.save();
    res.json({ success: true, message: 'new skill added' });
  },
  createUser: async (req, res) => {
    const newUser = new User({ authToken: req.user.sub });
    await newUser.save();
    res.json({ success: true, message: 'new user created' });
  },
  findUser: async (req, res) => {
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    if (!userDoc) {
      userController.createUser(req, res);
    } else {
      res.json({ success: true, message: 'user already exists' });
    }
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
