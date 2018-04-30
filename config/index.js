
var nconf = require('nconf');
/** @type AzureKeyVaultClient */
var azureKeyVaultClientClass =  require('../scripts/azureKeyVaultClient');
var path = require('path');

var env = process.env.NODE_ENV || 'local';

var privateFile = path.join(__dirname, "private.json");
var publicFile = path.join(__dirname, "public.json");


let azureKeyVaultConfigSetter = function (azureSecret) {

  config.set(azureSecret.key, azureSecret.value);
};


nconf.Provider.prototype.azureKeyVault = function() {
  let azureKeyVaultClientObj = new azureKeyVaultClientClass();
  azureKeyVaultClientObj.getAllSecrets( azureKeyVaultConfigSetter );
  return this;
};

//nconf.set('QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK', 'Esteeselnuevo valor');

//.file('private', privateFile)
// nconf: take confo first from environment then from private files and then from public files
var config = nconf.env()
    .file('private', privateFile)
    .azureKeyVault()
    .file('public', publicFile);

//config.set('QNA-SUBSCRIPTION-KEY-SBC-ACCOUNTING-UK', 'Este es el nuevo valor desde setter');
//config.azureKeyVault();


module.exports = config;
