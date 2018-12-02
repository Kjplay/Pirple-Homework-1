/*
 * Additional module just for fun
 */
//Dependencies
var fs = require("fs");
var tongueTwister = {};
//Get random number
tongueTwister.random = function(min, max) {
	min = typeof(min) == 'number' && min % 1 === 0 ? min : 0;
    max = typeof(max) == 'number' && max % 1 === 0 ? max : 0;
    return Math.floor(Math.random()*(max-min+1)+min);
};
//Read the tongue twisters
tongueTwister.get = function(num) {
	var content = fs.readFileSync(__dirname+'/tongue_twisters.txt', 'utf8').split(/\r?\n/);
	num = typeof num == "number" && num >=0 && num < content.length ? num : tongueTwister.random(0,content.length-1);
	return content[num];
};
module.exports = tongueTwister.get;