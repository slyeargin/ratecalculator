var http = require('http');
var connect = require('connect');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var logger = require('morgan')
var directory = 'public';
var port = process.env.PORT;


var app = connect()

  .use(logger(':remote-addr -> :method :url [:status]'))
  .use(serveStatic(directory))
  .use(bodyParser.urlencoded({
      extended: true
  }))
  .use(bodyParser.json())
  .use(function(req, res){
    res.end(JSON.stringify(req.body));
  })

http.createServer(app).listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Directory: ' + directory);
});
