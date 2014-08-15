var express = require("express");
var logfmt = require("logfmt");
var fs = require("fs");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
