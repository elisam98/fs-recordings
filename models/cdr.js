var mongoose = require('mongoose');

var cdrSchema = mongoose.Schema({
	uuid: String,
	date: Number,
	direction: String,
	from: String,
	to: String,
	duration: String,
	status: String,
	file: String
});

module.exports = mongoose.model('Cdr', cdrSchema);