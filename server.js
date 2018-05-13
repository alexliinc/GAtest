var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

/*************
 * BodyParser *
 *************/

// parse incoming urlencoded form data
// and populate the req.body object
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*********
 * Views *
 *********/

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

/**********
 * ROUTES *
 **********/

// Using public folder to reference css and js and imgs
app.use(express.static(__dirname + '/public'));

/*
 * HTML Endpoints
 */
var routes = require('./config/routes.js');
app.use(routes);

/**********
 * SERVER *
 **********/

// listen on port 3000
//app.listen(process.env.PORT || 3000)
app.listen(process.env.PORT || 3000, function() {
  console.log('Express server is up');
});
