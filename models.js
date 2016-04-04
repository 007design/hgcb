var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

var CharacterSchema = new mongoose.Schema({
	user: String,
	name: String,
	profession: String,
	rank: String,
	nationality: String,
	unit: String,
	primaryTraits: Object,
	secondaryTraits: Object,
	skills: Array
})

module.exports = {
  user: mongoose.model('User', UserSchema),
  character: mongoose.model('Character', CharacterSchema)
};