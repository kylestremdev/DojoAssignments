var mongoose = require('mongoose');

// Models
var Post  = mongoose.model('Post'),
    User  = mongoose.model('User'),
    Topic = mongoose.model('Topic');

module.exports = {
  create: function (req, res) {
    var newPost = new Post({
      content: req.body.content,
    })

    User.findById(req.body.user_id).exec()
    .then(function (user) {
      user.posts.push(newPost);
      newPost._user = user;

      return user.save();
    }, function (err) {
      return res.status(400).send(err);
    }).then(function (updateUser) {
      return Topic.findById(req.params.topic).exec();
    }, function (err) {
      return res.status(400).send(err);
    }).then(function (topic) {
      topic.posts.push(newPost);
      newPost._topic = topic;

      return topic.save();
    }, function (err) {
      return res.status(400).send(err);
    }).then(function (updateTopic) {
      return newPost.save()
    }, function (err) {
      return res.send(400).send(err);
    }).then(function (newPost) {
      return res.redirect('/topics/' + req.params.topic);
    }, function (err) {
      return res.status(400).send(err);
    })
  }
}
