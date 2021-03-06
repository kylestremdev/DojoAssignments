var express     = require('express'),
    bodyParser  = require('body-parser'),
    path        = require('path'),
    app         = express();

// Initialize mongoose connection
require('./server/config/mongoose.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.set('views', path.join(__dirname, './client'));

var route_handler = require('./server/config/routes.js');

route_handler(app);

app.listen(8000, function () {
  console.log("Server running on port 8000");
});
