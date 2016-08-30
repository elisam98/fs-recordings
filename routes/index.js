var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.get('/', function(req, res) {
	if(!req.user) {
		res.redirect('/logout');
	} else {
		res.render('index', {user: req.user});
	}
});

router.get('/logout', (req, res)=> {
	req.logout();
	res.redirect('/login');
});

router.get('/login', (req, res)=> {
	res.render('login', { user: req.user, message: req.flash('error')});
});

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true
	})
);

router.get('/register', (req, res)=> {
	if(!req.user) {
		res.redirect('/');
	} else if (req.user.role === 'admin') {
		res.render('register', {user: req.user});
	}
	res.redirect('/');
});

router.post('/register', (req, res)=> {
	Account.register(new Account({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		role: req.body.role
	}), req.body.password, (err, account)=> {
		if (err) {
			return res.render('register', { account : account });
		}

		passport.authenticate('local')(req, res, ()=> {
			res.redirect('/');
		});
	});
});

module.exports = router;
