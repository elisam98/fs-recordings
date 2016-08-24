var mongoose = require('mongoose');

var cdrSchema = mongoose.Schema({
	date: String,
	direction: String,
	from: String,
	to: String,
	status: String,
	file: String
});

module.exports = mongoose.model('Cdr', cdrSchema);