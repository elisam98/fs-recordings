var router = require('express').Router();
var Account = require('../models/account');

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	Account.findOne({_id: id}, function(err, user) {
		if (err) return handleError(err);
		console.log(user);
		res.render('account', {user: user});
	});
});

module.exports = router;
