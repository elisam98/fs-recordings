/* global handleError */
var express = require('express');
var router = express.Router();
var Account = require('../../models/account');

router.get('/', (req, res)=> {
	Account.find({}, (err, docs)=> {
		if (err) return handleError(err);
//		console.log(docs);
		res.json(docs);
	});
});

router.post('/', (req, res)=> {
//	console.log(req.body);

	var account = new Account({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		role: req.body.role
	});

	account.save((err)=> {
		if (err) return handleError(err);
		res.json(req.body);
	});

});

router.get('/:id', (req, res)=> {
	var id = req.params.id;
	Account.findOne({_id: id}, (err, account)=> {
		if (err) return handleError(err);
		res.json(account);
	});
});

router.delete('/:id', (req, res)=> {
	var id = req.params.id;
	Account.remove({_id: id}, (err)=> {
		if (err) return handleError(err);
//		console.log('Removed Account id ' + id);
		res.json(id);
	});

});

module.exports = router;
