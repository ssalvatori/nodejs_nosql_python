var http = require('http');
var fs =  require('fs');
var util = require('util');
var journey = require('journey');

/*
	Settings
*/
var settings = require('./settings');
eval(fs.readFileSync('settings.js'), encoding="ascii");

var router = new(journey.Router);

router.map(function () {
    this.root.bind(function (req, res) { // GET '/'
        res.send(200, {}, "Welcome");
    });
    this.get('/version').bind(function (req, res) {
        res.send(200, {}, { version: journey.version.join('.') });
    });
  
		this.post('/add').bind(function (req, res, data) {

      /*
        data = {'id_device' : '1',
        'datetime' : '2013-04-21',
        'peopleCount' :  100,
        'rowLevel' : 2,
        'imagePath': '/sdfasd/dsfa/32423.gif'}
        */
      
				console.log("Request ");
      	console.log(req);
        console.log(data.id_device);
      
      res.send(200, {}, { result: "OK" });
      
		});
});

console.log("initializing server on port "+settings.serverPort);
http.createServer(function (request, response) {
    var body = "";

  	console.log('Incoming Request', { url: request.url });
  
    request.addListener('data', function (chunk) { body += chunk });
    request.addListener('end', function () {
        //
        // Dispatch the request to the router
        //
        router.handle(request, body, function (result) {
            response.writeHead(result.status, result.headers);
            response.end(result.body);
        });
    });
  
}).listen(settings.serverPort);