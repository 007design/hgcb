var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String
});

module.exports = {
  user: mongoose.model('User', UserSchema)
};