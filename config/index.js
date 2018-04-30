
const nconf = require('../scripts/nconfCustom');

var path = require('path');
var env = process.env.NODE_ENV || 'local';

var privateFile = path.join(__dirname, "private.json");
var publicFile = path.join(__dirname, "public.json");

// nconf: take confo first from environment then from private files and then from public files
const config = nconf.env()
    .azureKeyVault()
    .file('private', privateFile)
    .file('public', publicFile);

module.exports = config;
