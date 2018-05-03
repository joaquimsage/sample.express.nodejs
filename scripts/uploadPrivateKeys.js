process.on('exit', (code) => {
  console.log(`About to SALIR with code: ${code}`);
});


//const privateDist = require('../config/private.json.dist');
const azureKeyVaultClientClass = require('./azureKeyVaultClient');

let scriptHasEnded = false;
let scriptHasEndedWithErr = false;

let privateDist = JSON.parse(require('fs').readFileSync('../config/private.json.dist', 'utf8'));

/*  1. Request ENVIRONMENT VARS:  */
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const vaultUri = process.env.VAULT_URI;


/*  2. Configure and authenticate AzureKeyVaul client:  */
const azureKeyClient = new azureKeyVaultClientClass.AzureKeyVaultClient();






/*  3. Read list of variables in private.json.dist:  */
for (let secretVarLocal in privateDist) {

  let cleanSecretVarLocal = secretVarLocal.replace(/_/g, "-");
  console.log(cleanSecretVarLocal);

  //azureKeyClient.getSecret();

  azureKeyClient.setSecret(cleanSecretVarLocal, 'new value', function (err, secretBundle) {

    if (err) {
      scriptHasEndedWithErr = true;
      console.log(err.message);
      return;
    }
    console.log(' Secret key looks like set');

    console.log(' Value new is ' + 'new value');

  });

}

scriptHasEnded = true;
//(err, secretBundle)


if (scriptHasEnded && scriptHasEndedWithErr) {
  console.log('Has finished with errors');
  process.exit(1)
}

setTimeout( function () {

  process.exit()
}, 10000);