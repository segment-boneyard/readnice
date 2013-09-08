var express = require('express');
var http = require('http');
var hbs = require('hbs');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', hbs.__express);
app.use('/build', express.static(__dirname + '/build'));
app.use(app.router);

app.get('/:project/:user', function(req, res){
  res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
