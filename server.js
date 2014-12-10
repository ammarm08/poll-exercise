var express = require('express');
var app = express();

app.get('/', function(request, response) {
	response.render('index.ejs');
})

app.get('/results', function(request, response) {
	response.render('results.ejs');
})

app.use(express.static(__dirname + '/public'));

app.listen(3000, function() {
	console.log("working");
})