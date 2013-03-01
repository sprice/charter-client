var connect = require('connect');
var http = require('http');
var app;

var port = process.env.PORT || 8080;

app = connect()
  .use(connect.static('app'))
  .use('/src', connect.static('node_modules'))
  .use('/lib', connect.static('lib'))
;

http.createServer(app).listen(port, function() {
  console.log('Charter client running on http://localhost:' + port);
});
