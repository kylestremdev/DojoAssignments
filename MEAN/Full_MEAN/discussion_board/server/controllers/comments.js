var mongoose = require('mongoose');

// Models
var Comment = mongoose.model('Comment'),
    User    = mongoose.model('User'),
    Post    = mongoose.model('Post');

module.exports = {
  create: function (req, res) {
    var newComment = new Comment({
      content: req.body.content,
    })

    User.findById(req.body.user_id).exec()
    .then(function (user) {
      user.comments.push(newComment);
      newComment._user = user;

      return user.save();
    })
    .then(function (updatedUser) {
      return Post.findById(req.params.post).exec()
    })
    .then(function (post) {
      post.comments.push(newComment);
      newComment._post = post;

      return post.save();
    })
    .then(function (updatedPost) {
      return newComment.save();
    })
    .then(function (newComment) {
      res.redirect('/topics/' + req.body.topic_id);
    }).catch(function (err) {
      res.status(400).send(err);
    })
  }
}
