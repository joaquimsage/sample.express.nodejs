var KeyVault = require('azure-keyvault');
var AuthenticationContext = require('adal-node').AuthenticationContext;

var clientId = "c506f1a5-60aa-4c5e-8146-b2a322c6ef34";
var clientSecret = "fq/0iLXCe4UNQqr8+FFap946hxC5PfVzWk5rVtBcuqc=";
var vaultUri = "https://quinokeyvaultsample.vault.azure.net/";

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

/*
  console.log('resultado = ' );
  console.log(result);

  console.log(result[0].id);
  */
 // loop(result.nextLink);
});
/**********************************************************/


function getSecretValue(keyVaultUri) {
  client.getSecret(keyVaultUri, (err, result) => {

    console.log(result.value);
    return result.value;
  });
}


/*

client.setSecret(vaultUri, 'mysecret', 'my password', options, function (err, secretBundle) {

  // List all secrets
  var parsedId = KeyVault.parseSecretIdentifier(secretBundle.id);
  client.getSecrets(parsedId.vault, parsedId.name, function (err, result) {
    if (err) throw err;

    var loop = function (nextLink) {
      if (nextLink !== null && nextLink !== undefined) {
        client.getSecretsNext(nextLink, function (err, res) {
          console.log(res);
          loop(res.nextLink);
        });
      }
    };

    console.log(result);
    loop(result.nextLink);
  });
});

*/