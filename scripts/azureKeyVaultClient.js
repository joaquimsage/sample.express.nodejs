/* ...Azure key packages required... */
const KeyVault = require('azure-keyvault');
const AuthenticationContext = require('adal-node').AuthenticationContext;

let clientId = '';     //"c506f1a5-60aa-4c5e-8146-b2a322c6ef34";
let clientSecret = ''; //"fq/0iLXCe4UNQqr8+FFap946hxC5PfVzWk5rVtBcuqc=";
let vaultUri = '';     //"https://quinokeyvaultsample.vault.azure.net/";
const suffixSecretsUri = 'secrets/';


class AzureKeyVaultClient {

  /**
   * Each client is an instance of this class. Maybe we need in the same script
   * to call the DEV and STAGE Azure Key Vault. So we might nee 2 run env at the same time.
   */
  constructor() {

    this.clientId = process.env.CLIENT_ID;     //"c506f1a5-60aa-4c5e-8146-b2a322c6ef34";
    this.clientSecret = process.env.CLIENT_SECRET; //"fq/0iLXCe4UNQqr8+FFap946hxC5PfVzWk5rVtBcuqc=";
    this.vaultUri = process.env.VAULT_URI;     //"https://quinokeyvaultsample.vault.azure.net/";
    clientId = this.clientId;
    clientSecret = this.clientSecret;
    vaultUri = this.vaultUri;

    this._credentials = new KeyVault.KeyVaultCredentials(this.authenticator);
    this._client = new KeyVault.KeyVaultClient(this._credentials);
    this._secretsInAzure = [];
  }

  /**
   * @param challenge
   * @param {function} callback
   *
   */
  authenticator(challenge, callback) {

    // Create a new authentication context.
    let context = new AuthenticationContext(challenge.authorization);

    // Use the context to acquire an authentication token.
    return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function (err, tokenResponse) {
      if (err) {
        throw err;
      }
      // Calculate the value to be set in the request's Authorization header and resume the call.
      let authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;

      return callback(null, authorizationValue);
    });

  }

  /**
   * It expects a callback function which will receive an object representing a secretObject containing key and value.
   * It executes callbackOnSuccess for each secret key that exists in Azure Key Vault.
   * @param {function} callbackOnSuccess
   */
  getAllSecrets(callbackOnSuccess, optional) {

    let _this = this;

    this._client.getSecrets(this.vaultUri, {'maxresults': 25}, function (err, secretResults) {

      if (err) {
        throw err;
      }

      secretResults.forEach((secretKeyObj) => {

        let uriSecretKeyVault = secretKeyObj.id;
        let secretKey = uriSecretKeyVault.replace(vaultUri + suffixSecretsUri, '');

        _this._client.getSecret(uriSecretKeyVault, (err, result) => {

          if (err) {
            throw err;
          }


          let objSecret = {'key': secretKey, 'value': result.value};

          _this._secretsInAzure.push(objSecret);

          callbackOnSuccess(objSecret, optional);
        });

      });
    });

  }

  setSecret(secretKey, secretValue, callbackOnFinish) {

    let _this = this;
    let secretOptions = {
      contentType: 'test secret'
    };

    this._client.setSecret(this.vaultUri, secretKey, secretValue, secretOptions, callbackOnFinish);
  }

}

module.exports = {
  AzureKeyVaultClient: AzureKeyVaultClient
};