const User = require('../../models/userModel/index');

const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = new User({ authToken: req.user.sub });
      await newUser.save();
      res.json({ success: true, message: 'new user created' });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
  findUser: async (req, res) => {
    try {
      const userDoc = await User.findOne({ authToken: req.user.sub })
        .exec();
      if (!userDoc) {
        userController.createUser(req, res);
      } else {
        res.json({ success: true, message: 'user already exists' });
      }
    } catch (err) {
      res.json({ success: false, message: err });
    }
  },
};

module.exports = userController;
