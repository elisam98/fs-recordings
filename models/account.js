var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String,
	role: String
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
