const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  authToken: { type: String, unique: true },
  skills: [{ type: Schema.Types.ObjectId, ref: 'SkillModel' }],
});

module.exports = mongoose.model('UserModel', UserSchema);
