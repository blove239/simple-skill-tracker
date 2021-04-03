const Skill = require('../../models/skillModel/index');
const User = require('../../models/userModel/index');

const skillController = {
  createSkill: async (req, res) => {
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    const newSkill = new Skill({
      createdBy: userDoc._id,
      hours: 0,
      isDeleted: false,
      title: req.body.skill,
    });
    await newSkill.save();
    res.json({ success: true, message: 'new skill added' });
  },
  delete: async (req, res) => {
    const { skillId } = req.params;
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    const skillDoc = await Skill.findOne({ _id: skillId, createdBy: userDoc._id }, (err) => {
      if (err) console.log(err);
    });
    skillDoc.isDeleted = true;
    await skillDoc.save();
    res.json({ success: true, message: 'skill deleted' });
  },
  returnOneSkill: async (req, res) => {
    const { skillId } = req.params;
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    const skillDoc = await Skill.findOne({ _id: skillId, createdBy: userDoc._id }, (err) => {
      if (err) console.log(err);
    });
    res.json({ skills: skillDoc });
  },
  returnSkills: async (req, res) => {
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    const skills = await Skill.find({ createdBy: userDoc._id }, (err) => {
      if (err) console.log(err);
    });
    const activeSkills = skills.filter((skill) => !skill.isDeleted);
    res.json({ skills: activeSkills });
  },
  updateSkill: async (req, res) => {
    const { skillId } = req.params;
    const userDoc = await User.findOne({ authToken: req.user.sub })
      .exec();
    const skillDoc = await Skill.findOne({ _id: skillId, createdBy: userDoc._id }, (err) => {
      if (err) console.log(err);
    });
    if (req.body.incrementSkill) {
      skillDoc.hours += 0.5;
    } if (req.body.resetSkill) {
      skillDoc.hours = 0;
    }
    await skillDoc.save();
    res.json({ success: true, message: 'skill updated' });
  },
};

module.exports = skillController;
