const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  authToken: { type: String, unique: true },
  dateCreated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('UserModel', UserSchema);
