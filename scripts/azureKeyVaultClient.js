/* Azure key packages required */
const KeyVault = require('azure-keyvault');
const AuthenticationContext = require('adal-node').AuthenticationContext;

const clientId = process.env.CLIENT_ID;     //"c506f1a5-60aa-4c5e-8146-b2a322c6ef34";
const clientSecret = process.env.CLIENT_SECRET; //"fq/0iLXCe4UNQqr8+FFap946hxC5PfVzWk5rVtBcuqc=";
const vaultUri = process.env.VAULT_URI;     //"https://quinokeyvaultsample.vault.azure.net/";
const suffixSecretsUri = 'secrets/';


class AzureKeyVaultClient {


  constructor() {

    this._credentials = new KeyVault.KeyVaultCredentials(this.authenticator);
    this._client = new KeyVault.KeyVaultClient(this._credentials);
    this._secretsInAzure = [];
  }


  authenticator(challenge, callback) {

    // Create a new authentication context.
    var context = new AuthenticationContext(challenge.authorization);

    // Use the context to acquire an authentication token.
    return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function (err, tokenResponse) {
      if (err) {
        throw err;
      }
      // Calculate the value to be set in the request's Authorization header and resume the call.
      var authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;

      return callback(null, authorizationValue);
    });

  }

  /**
   * @param {function} callbackOnSuccess
   */
  getAllSecrets( callbackOnSuccess ) {

    let _this = this;

    this._client.getSecrets(vaultUri, {'maxresults': 25}, function (err, secretResults) {

      if (err) {
        throw err;
      }

      secretResults.forEach( (secretKeyObj) => {

        let uriSecretKeyVault = secretKeyObj.id;
        let secretKey = uriSecretKeyVault.replace(vaultUri + suffixSecretsUri, '');

        _this._client.getSecret(uriSecretKeyVault, (err, result) => {

          console.log(secretKey);
          console.log(result.value);

          let objSecret = { 'key':secretKey, 'value':result.value };

          _this._secretsInAzure.push(objSecret);

          callbackOnSuccess(objSecret);
        });

      });
    });


  }




  _getSecrets(callbackOnSuccess) {

    let _this = this;
    this._client.getSecrets(vaultUri, {'maxresults': 25}, function (err, result) {

      if (err) {
        throw err;
      }

      result.forEach((secretKeyObj) => {

        console.log(secretKeyObj.id);
        console.log(' el valor del cual es ');
        console.log(_this._getSecretValue(secretKeyObj.id));

      });
    });
  }


  _getSecretValue(keyVaultUri) {

    return client.getSecret(keyVaultUri, (err, result) => {

      console.log(result.value);
      return result.value;
    });
  }
}

module.exports = AzureKeyVaultClient;