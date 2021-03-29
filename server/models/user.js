const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  authToken: { type: String },
  email: { type: String },
  name: { type: String },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  username: { type: String },
});

mongoose.model('User', UserSchema);
