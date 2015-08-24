var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var winston = require('winston');
var fs = require('fs');

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
	res.render('main', {layout: 'main'});	
});

var server = app.listen(port);

console.log('References started on port ' + port);