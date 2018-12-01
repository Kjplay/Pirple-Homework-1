/*
 * Config file
 * exports ONLY one environment
 */
//Define the env object
var environments = {};
//Staging environment (default)
environments.staging = {
	"httpPort": 2000,
	"httpsPort": 2001,
	"envName": "staging"
};
//Production environment
environments.production = {
	"httpPort": 4000,
	"httpsPort": 4001,
	"envName": "production"
};
//Determine which env sholud be exported
var chosenEnv = typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV.toLowerCase() : "";
//Check if selected env exist
var envToExport = typeof environments[chosenEnv] == "object" ? environments[chosenEnv] : environments.staging; //Assign default
//Export the environment obejct
module.exports = envToExport;