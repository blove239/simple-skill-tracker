const mongoose = require('mongoose');

const { Schema } = mongoose;

const SkillSchema = new Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', select: false },
  dateCreated: { type: Date, default: Date.now() },
  hours: { type: Number },
  isDeleted: { type: Boolean, select: false },
  title: { type: String },
});

module.exports = mongoose.model('SkillModel', SkillSchema);
