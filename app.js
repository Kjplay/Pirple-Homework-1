/* HOMEWORK ASSIGMENT #1
 * Main app file
 * Returns a message on the "hello" route
 * Author: Jakub Jaruszewski
 */
//Dependecies
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var fs = require("fs");
var config = require("./config");
var tg = require("./tg");
//Log the server start with environment name
console.log("Server is starting in "+config.envName+" environment!");
//Instantiate the HTTP server
var httpServer = http.createServer(function(req, res) {
	serverLogic(req, res);
});
//Start the HTTP server
httpServer.listen(config.httpPort, function() {
	console.log("HTTP server listening on "+config.httpPort+" port!");
});
//Define HTTPS server options (key and cert)
var httpsServerOptions = {
	"key": fs.readFileSync("./https/key.pem"),
	"cert": fs.readFileSync("./https/cert.pem")
};
//Instantiate the HTTPS server
var httpsServer = https.createServer(httpsServerOptions, function(req, res) {
	serverLogic(req, res);
});
//Start the HTTPS server
httpsServer.listen(config.httpsPort, function() {
	console.log("HTTPS server listening on "+config.httpsPort+" port!");
});
//Server logic (both HTTP and HTTPS)
var serverLogic = function(req, res) {
	//Get the parsed URL
	var parsedURL = url.parse(req.url, true);
	//Get the path
	var path = parsedURL.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g, "");
	//Get the query string as an obejct
	var queryObj = parsedURL.query;
	//Get the headers
	var headers = req.headers;
	//Get the method
	var method = req.method.toUpperCase();
	//Get the paylod (if exists)
	var buffer = "";
	var decoder = new StringDecoder("utf-8");
	req.on("data", function(data) {
		buffer += decoder.write(data);
	});
	req.on("end", function(data) {
		buffer += decoder.end();
	});
	//Define an object with all data
	var data = {
		"url": parsedURL,
		"path": trimmedPath,
		"query": queryObj,
		"headers": headers,
		"method": method,
		"payload": buffer
	};
	//Determine which handler should API use
	var chosenHandler = typeof router[trimmedPath] != "undefined" ? router[trimmedPath] : handlers.notFound;
	//Callback for a handler
	chosenHandler(data, function(httpStatus, payload, headersObj){
		//check HTTP status
		httpStatus = typeof httpStatus == "number" ? httpStatus : 200; //Assign default
		//check the headers obejct
		headersObj = typeof headersObj == "object" ? headersObj : {}; //Assign default
		headersObj["Content-Type"] = "application/json"; //type of a payload
		//check the payload
		payload = typeof payload == "object" ? payload : {}; //Assign default
		var payloadString = JSON.stringify(payload);
		//res.setHeader("Content-Type", "application/json"); (different option of sending a header)
		res.writeHead(httpStatus, headersObj); //use writeHead instead of setHeader
		res.end(payloadString);
		//Log the request
		console.log("Returning this response:", httpStatus, payload, "with headers: \n", headersObj);
	});
};
//Define handlers object
var handlers = {};
//notFound handler
handlers.notFound = function(data, callback) {
	callback(404);
};
//hello handler
handlers.hello = function(data, callback) {
	var name = typeof data.query["name"] == "string" ? data.query["name"] : "new user";
	var message = "Hi "+name+"!";
	callback(200, {"message": message}, {"Question": "Will you find me? I'm a riddle!"});
}
//I don't know who did this
handlers.riddle = function(data, callback) { //do not cheat!
	var payload = {
		"riddle": "What gets wetter and wetter the more it dries?"
	};
	var answer = typeof data.query["answer"] == "string" ? data.query["answer"] : "";
	if (answer.toLowerCase() == "towel") payload["message"] = "Congrats! :) You solved it!"; //I told you!
	callback(200, payload);
};
//Nevermind. I did.
handlers.tongue = function(data, callback) { //random Polish tongue twister
	var num = typeof data.query["number"] == "string" ? data.query["number"].parseInt() : -1;
	var tongueTwister = tg(num);
	callback(200, {"tongue-Twister": tongueTwister});
};
//Define the router
var router = {
	"hello": handlers.hello,
	"riddle": handlers.riddle,
	"tonguetwister": handlers.tongue
};
