var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

require('./server/config/mongoose.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var route_handlers = require('./server/config/routes.js');

route_handlers(app);

app.listen(8000, function () {
  console.log("Server running on port 8000");
});
