var users = require('./../controllers/users.js');
var messages = require('./../controllers/messages.js');
var comments = require('./../controllers/comments.js');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.post('/login', users.login);
  app.post('/register', users.register);
  app.get('/messages', messages.index);
  app.post('/messages', messages.create);
  app.post('/comment', comments.create);
}
