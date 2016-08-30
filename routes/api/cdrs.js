/* global handleError */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var Cdr = require('../../models/cdr');

router.get('/', (req, res)=> {

	var from = req.query.from ? req.query.from : '.*';
	var to = req.query.to ? req.query.to : '.*';
	var direction = req.query.direction ? req.query.direction : '.*';
	var startDate = req.query.startDate ? moment(req.query.startDate).valueOf() : 0;
	var endDate = req.query.endDate ? moment(req.query.endDate).valueOf() : Date.now();

	Cdr.find({from: new RegExp(from),
				to: new RegExp(to),
				direction: new RegExp(direction),
				date: {$gte: startDate, $lte: endDate}
			})
	.sort('-date')
	.exec((err, docs)=> {
		if (err) return handleError(err);
		var length = docs.length;
		var limit = req.query.limit ? parseInt(req.query.limit) : 5;
		var offset = req.query.offset ? parseInt(req.query.offset) : 0;

		docs = offset > 0 ? docs.slice(offset, offset + limit) : docs.slice(offset, limit);

		res.json({
			meta: {
				length: length,
				offset: offset,
				limit: limit,
				startDate: startDate,
				endDate: endDate
			},
			data: docs
		});

	});
});

router.post('/', (req, res)=> {
	var record = JSON.parse(req.body.cdr).variables;
//	console.log(record);
	if(record.domain_name == 'mytickets.com') {
		var cdr = new Cdr({
			uuid: record.uuid,
			date: record.start_epoch * 1000,
			direction: record.direction,
			from: record.sip_from_user,
			to: record.sip_to_user,
			duration: record.billsec,
			status: record.hangup_cause,
			file: record.uuid
		});

		cdr.save((err)=> {
			if (err) return handleError(err);
			res.json(cdr);
		});
	}

});

module.exports = router;
