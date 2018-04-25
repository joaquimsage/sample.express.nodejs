var express = require('express');
var router = express.Router();

var config = require('../config/index');


/* GET home page. */
router.get('/', function (req, res, next) {


  if (config.get('QNA-BOT-SUPPORTED-LOCALES') === '') {
    throw new ReferenceError('QNA-BOT-SUPPORTED-LOCALES does not exist.');
  }
  if (config.get('QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK') === '') {
    throw new ReferenceError('QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK does not exist.');
  }

  var qnaBotSupportedLocales = config.get('QNA-BOT-SUPPORTED-LOCALES');
  var qnaBotSubscriptionKeySbcAcc = config.get('QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK');


  res.render('key-vault', {
    keyVaultKey: 'QNA-BOT-SUPPORTED-LOCALES',
    keyVaultValue: qnaBotSupportedLocales,
    privateKeyVaultKey: 'QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK',
    privateKeyVaultValue: qnaBotSubscriptionKeySbcAcc,
  });
});

module.exports = router;
