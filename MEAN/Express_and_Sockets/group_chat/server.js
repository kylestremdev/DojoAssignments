var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(8000, function () {
  console.log("Server is running on port 8000");
});

var io = require('socket.io').listen(server);

var messages = [];

var users = {};

io.sockets.on('connection', function (socket) {

  socket.on('disconnect', function (data) {
    socket.broadcast.emit('new_user_message', {messages: [{name: "SERVER ::", message: users[socket.id] + " has left the session"}]});
    delete users[socket.id];
  });

  socket.on('new_user', function(data) {
    users[socket.id] = data.name;
    socket.broadcast.emit('new_user_message', {messages: [{name: "SERVER ::", message: data.name + " has joined the session"}]});
    if (messages.length > 0) {
      socket.emit('update_board', {messages: messages});
    }
  });

  socket.on('new_message', function (data) {
    var newMessage = {name: users[socket.id], message: data.message};
    messages.push(newMessage);
    io.emit('update_board', {messages: [newMessage]});
  });
});
