const mongoose = require('mongoose');

const { Schema } = mongoose;

const SkillSchema = new Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
  dateCreated: { type: Date, default: Date.now() },
  hours: { type: Number },
  isDeleted: { type: Boolean },
  title: { type: String },
});

mongoose.model('SkillModel', SkillSchema);
