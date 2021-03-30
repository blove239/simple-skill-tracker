const User = require('../models/userModel');

const userController = {
  find: async (req, res) => {
    const found = await User.findOne({ authToken: req.user.sub }, (err, doc) => {
      if (!doc) {
        userController.create(req, res);
      }
    });
    if (found) {
      res.json({ skills: found.skills });
    }
  },
  create: async (req, res) => {
    const newUser = new User({ authToken: req.user.sub });
    newUser.save();
    res.json({ skills: newUser.skills });
  },
};

module.exports = userController;
