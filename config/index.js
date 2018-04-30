
var nconf = require('nconf');
/** @type AzureKeyVaultClient */
var azureKeyVaultClientClass =  require('../scripts/azureKeyVaultClient');
var path = require('path');

var env = process.env.NODE_ENV || 'local';

var privateFile = path.join(__dirname, "private.json");
var publicFile = path.join(__dirname, "public.json");

let azureKeyVaultConfigSetter = function (azureSecret, options) {

  options.config.set(azureSecret.key, azureSecret.value);
};
nconf.Provider.prototype.azureKeyVault = function() {
  let azureKeyVaultClientObj = new azureKeyVaultClientClass();
  azureKeyVaultClientObj.getAllSecrets( azureKeyVaultConfigSetter, {'config': this} );
  return this;
};

// nconf: take confo first from environment then from private files and then from public files
const config = nconf.env()
    .file('private', privateFile)
    .azureKeyVault()
    .file('public', publicFile);

module.exports = config;
