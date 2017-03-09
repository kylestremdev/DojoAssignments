var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req,res) {
  res.render('index')
});

var server = app.listen(8000, function () {
  console.log("Server running on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log(socket.id, "just connected");

  socket.on('posting_form', function (data) {
    console.log(data);
    socket.emit('updated_message', data);
    socket.emit('random_number', (Math.floor(Math.random() * 1000)))
  });
})
