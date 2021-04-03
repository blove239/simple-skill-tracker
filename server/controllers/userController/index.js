const User = require('../../models/userModel/index');

const userController = {
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
};

module.exports = userController;
