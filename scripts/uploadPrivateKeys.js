//const privateDist = require('../config/private.json.dist');

var privateDist = JSON.parse(require('fs').readFileSync('../config/private.json.dist', 'utf8'));

/*  1. Request ENVIRONMENT VARS:  */
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const vaultUri = process.env.VAULT_URI;


/*  2. Read list of variables in private.json.dist:  */

for (let secretVarLocal in privateDist) {
  console.log(secretVarLocal);
}

