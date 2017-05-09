var express = require('express'),
    path    = require('path'),
    bP      = require('body-parser'),
    app     = express();

require('./server/config/mongoose.js');

app.use(bP.urlencoded({extended:true}));
app.use(bP.json());

app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./bower_components")));

app.set('views', path.join(__dirname, "./client"));

var route_handler = require('./server/config/routes.js');

route_handler(app);

app.listen(8000, function () {
  console.log("Server running on port 8000");
});
