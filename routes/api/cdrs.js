var express = require('express');
var router = express.Router();
var Cdr = require('../../models/cdr');

/* GET users listing. */
router.get('/', function(req, res, next) {

	Cdr.find({}, function(err, docs) {
		if (err) return handleError(err);
		var length = docs.length;
		var limit = req.query.limit? parseInt(req.query.limit) : 5;
		var offset = req.query.offset ? parseInt(req.query.offset) : 0;

		docs = offset > 0 ? docs.slice(offset, offset + limit) : docs.slice(offset, limit);

		res.json({
			meta: {
				length: length,
				offset: offset,
				limit: limit,
//				page: page,
//				total_pages: totalPages
			},
			data: docs
		});

	});
});

router.post('/', function(req, res, next) {
	console.log(req.body);

	var cdr = new Cdr({
		date: req.body.date,
		direction: req.body.direction,
		from: req.body.from,
		to: req.body.to,
		status: req.body.status,
		file: req.body.file

	});

	cdr.save(function (err) {
		if (err) return handleError(err);
		res.json(req.body);
	});


});

module.exports = router;
