const nconf = require('nconf');
/** @type AzureKeyVaultClient */
const azureKeyVaultClientClass =  require('./azureKeyVaultClient');



let azureKeyVaultConfigSetter = function (azureSecret, options) {

  options.config.set(azureSecret.key, azureSecret.value);
};

nconf.Provider.prototype.azureKeyVault = function() {
  let azureKeyVaultClientObj = new azureKeyVaultClientClass();
  azureKeyVaultClientObj.getAllSecrets( azureKeyVaultConfigSetter, {'config': this} );
  return this;
};


module.exports = nconf;