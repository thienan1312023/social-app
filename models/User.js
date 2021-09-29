const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  imgProfile: String,
  imgBackgroundProfile: String,
  bio: String,
  introductions: Array,
  password: String,
  email: String,
  createdAt: String
});

module.exports = model('User', userSchema);
