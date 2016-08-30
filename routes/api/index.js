var express = require('express');
var router = express.Router();

router.get('/', (req, res)=> {
	res.send('SafeTelecom Logs API');
});

module.exports = router;
