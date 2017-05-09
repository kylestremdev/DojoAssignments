var mongoose = require('mongoose');

// Models
var Comment = mongoose.model('Comment'),
    Message = mongoose.model('Message'),
    User = mongoose.model('User');

module.exports = {
  create: function (req, res) {
    User.findOne({_id: req.body.user_id}, function (err, user) {
      if (err) res.status(400).send(err);
      else {
        Message.findOne({_id: req.body.message_id}, function (err, message) {
          if (err) res.status(400).send(err);
          else {
            var comment = new Comment({
              comment: req.body.comment,
            });

            comment._user = user._id;
            comment._message = message._id;

            comment.save(function (err) {
              if (err) res.status(400).send(err);
              else {
                user.comments.push(comment);
                user.save(function(err) {
                  if (err) res.status(400).send(err);
                  else {
                    message.comments.push(comment);
                    message.save(function(err) {
                      if (err) res.status(400).send(err);
                      else {
                        res.redirect('/messages');
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
}
