const Skill = require('../../models/skillModel/index');
const User = require('../../models/userModel/index');
const validate = require('../../utils/validation');

const skillController = {
  createSkill: async (req, res) => {
    try {
      const { skill } = req.body;
      await validate.createSkillSchema.validateAsync(skill);
      const userDoc = await User.findOne({ authToken: req.user.sub })
        .exec();
      const newSkill = new Skill({
        createdBy: userDoc._id,
        hours: 0,
        isDeleted: false,
        title: skill,
      });
      await newSkill.save();
      res.json({ success: true, message: 'new skill added' });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
  delete: async (req, res) => {
    try {
      const { skillId } = req.params;
      await validate.skillIDSchema.validateAsync(skillId);
      const userDoc = await User.findOne({ authToken: req.user.sub })
        .exec();
      const skillDoc = await Skill.findOne({ _id: skillId, createdBy: userDoc._id });
      skillDoc.isDeleted = true;
      await skillDoc.save();
      res.json({ success: true, message: 'skill deleted' });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
  returnOneSkill: async (req, res) => {
    try {
      const { skillId } = req.params;
      await validate.skillIDSchema.validateAsync(skillId);
      const userDoc = await User.findOne({ authToken: req.user.sub })
        .exec();
      const skillDoc = await Skill
        .findOne({ _id: skillId, createdBy: userDoc._id, isDeleted: false });
      res.json({ skills: skillDoc });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
  returnAllSkills: async (req, res) => {
    try {
      const userDoc = await User.findOne({ authToken: req.user.sub })
        .exec();
      const skills = await Skill.find({ createdBy: userDoc._id, isDeleted: false });
      res.json({ skills });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
  updateSkill: async (req, res) => {
    try {
      const { skillId } = req.params;
      const userDoc = await User.findOne({ authToken: req.user.sub })
        .exec();
      const skillDoc = await Skill.findOne({ _id: skillId, createdBy: userDoc._id });
      if (req.body.incrementSkill) {
        skillDoc.hours += 0.5;
      } if (req.body.resetSkill) {
        skillDoc.hours = 0;
      }
      await skillDoc.save();
      res.json({ success: true, message: 'skill updated' });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
};

module.exports = skillController;
