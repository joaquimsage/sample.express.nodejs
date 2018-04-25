var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/sample-iframe-post-message', function(req, res, next) {


  if (config.get('QNA-BOT-SUPPORTED-LOCALES')==='') {
    throw new ReferenceError('QNA-BOT-SUPPORTED-LOCALES does not exist.');
  }
  if (config.get('QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK')==='') {
    throw new ReferenceError('QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK does not exist.');
  }


  res.render('sample-iframe-post-message', { title: 'Sage Business Cloud chat with Pegg' });
});

module.exports = router;
