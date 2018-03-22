var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/sample-iframe-post-message', function(req, res, next) {
  res.render('sample-iframe-post-message', { title: 'Sage Business Cloud chat with Pegg' });
});

module.exports = router;
