var express = require('express');
var router = express.Router();
var Account = require('../../models/account');

router.get('/', function(req, res, next) {
	Account.find({}, function(err, docs) {
		if (err) return handleError(err);
		console.log(docs);
		res.json(docs);
	});
});

router.post('/', function(req, res, next) {
	console.log(req.body);

	var account = new Account({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		role: req.body.role,
	});

	account.save(function (err) {
		if (err) return handleError(err);
		res.json(req.body);
	});

});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	Account.findOne({_id: id}, function (err, account) {
		if (err) return handleError(err);
		console.log(account);
	});
});

router.delete('/:id', function(req, res, next) {
	var id = req.params.id;
	Account.remove({_id: id}, function (err) {
		if (err) return handleError(err);
		console.log('Removed Account id ' + id);
	});

});

module.exports = router;
