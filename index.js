var config = require('./config');
var cool = require('cool-ascii-faces');
var express = require('express');
var serve = require('serve-static');
var serve_opts = {
  maxAge: config.env === 'production' ? '1 hour' : 0,
};
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  // console.log('request', request);
  // response.render('pages/index');
  var result = '';
  var times = process.env.TIMES || 5;
  for (i=0; i < times; i++)
    result += cool();
  // response.send('<div style="text-align: center;">' + result + '</div>');
  response.render('pages/index')
});

app.get('/cool', function(request, response){
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
