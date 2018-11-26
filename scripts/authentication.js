var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;

// Should complain about var
var clientId = "";
var clientSecret = "";
let vaultUri = "https://quinokeyvaultsample.vault.azure.net/";

// Authenticator - retrieves the access token
var authenticator = function (challenge, callback) {

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

};
/* ------------------------------------- */

var credentials = new KeyVault.KeyVaultCredentials(authenticator);
var client = new KeyVault.KeyVaultClient(credentials);

//var parsedId = KeyVault.parseSecretIdentifier(secretBundle.id);


client.getSecrets(vaultUri, {'maxresults': 25}, function (err, result) {
  if (err) {
    throw err;
  }

  result.forEach( (secretKeyObj) => {

    console.log(secretKeyObj.id);
    console.log( ' el valor del cual es ');
    console.log( getSecretValue(secretKeyObj.id) );

  });

});
/**********************************************************/


function getSecretValue(keyVaultUri) {
  client.getSecret(keyVaultUri, (err, result) => {

    console.log(result.value);
    return result.value;
  });
}