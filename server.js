var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var winston = require('winston');
var fs = require('fs');
var Reference = require('./server/reference');
var controller = require('./server/controller');

var port = 8082;

//============= Create server ============

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(cookieParser());

//============= Static ============

app.use(express.static(__dirname + '/client'));


//============= Template engine ============

var hbs = exphbs.create({
    defaultLayout: 'default',
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// ============== ROUTES ================

app.get("/", function(req, res, next) {
	if (req.query.ref) {
		var ref = new Reference(req.query.ref);		
		res.locals = {
			title: 'TR :: ' + ref.config.title,
			config: JSON.stringify({
				references: Reference.getAllList(),
				ref: ref.config,
				data: ref.data,	
			})
		}
		res.render('main', {layout: 'main'});		
	} else {
		res.writeHead(502);
		res.send('не задан параметр ref');	
		res.end();
	}
});

app.post("/", function(req, res, next) {
	if (req.query.ref) {
		var ref = new Reference(req.query.ref);
		if (req.query.cmd) {
			controller.process(ref, req.query.cmd, req.body, function(err, resp) {
				if (err) {
					res.writeHead(502);
					res.end(err);
				} else {
					res.writeHead(200, {"Content-Type": "application/json"});
					res.end(JSON.stringify(resp));
				}
			});
		} else {
			res.writeHead(502);
			res.send('не задан параметр cmd');	
			res.end();
		}
	} else {
		res.writeHead(502);
		res.send('не задан параметр ref');	
		res.end();
	}
});

var server = app.listen(port);

console.log('References started on port ' + port);