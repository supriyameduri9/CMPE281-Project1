var express = require('express');
var fileUpload = require('express-fileupload');
var port = process.env.PORT || 3000;
var server = express();
var bodyParser = require('body-parser');

path = require('path'),
publicDir = path.join(__dirname,'public');

server.use(fileUpload());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(publicDir, {redirect: false})) 

server.all('/', function(req, res) {
  res.sendFile(publicDir + '/index.html');
});

server.all('/login', function(req, res) {
  res.sendFile(publicDir + '/index.html');
});

server.all('/home', function(req, res) {
  res.sendFile(publicDir + '/index.html');
});

require('./services/file.service.server.js')(server);

server.listen(port);