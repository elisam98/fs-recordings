var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.user) {
		res.redirect('/logout');
	} else {
		res.render('index', {user: req.user});
//		res.sendfile('../public/index.html');
	}
});

router.get('/logout', function(req, res, next) {
  console.log('logging out.');
  req.logout();
  res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login', { user: req.user });
});

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	}), function(req, res) {
		console.log('hit login');
	}
);

router.get('/register', function(req, res) {
	res.render('register');
});

router.post('/register', function(req, res) {
	Account.register(new Account({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
	}), req.body.password, function(err, account) {
		if (err) {
			return res.render('register', { account : account });
		}

		passport.authenticate('local')(req, res, function () {
				res.redirect('/');
		});
	});
});

module.exports = router;
