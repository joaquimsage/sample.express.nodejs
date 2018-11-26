
const nconf = require('../scripts/nconfCustom');

var path = require('path');
var env = process.env.NODE_ENV || 'local';

var privateFile = path.join(__dirname, "private.json");
var publicFile = path.join(__dirname, "public.json");

// nconf: take confo first from environment then from private files and then from public files
let config = nconf.env();
 config = config.file('private', privateFile);
 config = config.file('public', publicFile);
    //.azureKeyVault()




module.exports = config;
