var express = require('express'),
    path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.listen(8000, function () {
  console.log('Server listening on port 8000');
})