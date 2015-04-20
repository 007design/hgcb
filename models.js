var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String
});

module.exports = mongoose.model('User', UserSchema);