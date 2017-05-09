// Controllers
var users       = require('./../controllers/users.js'),
    topics      = require('./../controllers/topics.js'),
    posts       = require('./../controllers/posts.js'),
    comments    = require('./../controllers/comments.js'),
    categories  = require('./../controllers/categories.js');

module.exports = function (app) {
  app.get('/user/:id', users.show);
  app.post('/user', users.login);
  app.get('/categories', categories.index);
  app.get('/topics', topics.index);
  app.post('/topics', topics.create);
  app.get('/topics/:topic', topics.show);
  app.post('/posts/:topic', posts.create);
  app.post('/comments/:post', comments.create);
}
