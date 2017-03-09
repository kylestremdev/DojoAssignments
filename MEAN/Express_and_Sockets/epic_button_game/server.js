var express = require('express'),
    path = require('path');

var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req,res) {
  res.render('index');
});

var server = app.listen(8000, function () {
  console.log('Server is running on port 8000');
});

var io = require('socket.io').listen(server);

var count = 0;

io.sockets.on('connection', function (socket) {
  console.log(socket.id, "joined the server");
  socket.emit('updated_count', count);

  socket.on('add_count', function () {
    count++;
    io.emit('updated_count', count);
  });

  socket.on('reset_count', function () {
    count = 0;
    io.emit('updated_count', count);
  });
});
