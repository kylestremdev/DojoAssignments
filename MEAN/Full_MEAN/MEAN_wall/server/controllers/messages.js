var mongoose = require('mongoose');

// Models
var Message = mongoose.model('Message'),
    User = mongoose.model('User');

module.exports = {
  index: function (req, res) {
    Message.find({})
    .populate('comments _user')
    .populate({
      path: 'comments',
      populate: { path: '_user'}
    })
    .exec(function (err, messages) {
      if (err) res.status(400).send(err);
      else {
        res.json(messages);
      }
    });
  },
  create: function (req, res) {
    User.findOne({_id: req.body.user_id}, function (err, user) {
      if (err) res.status(400).send(err);
      else {
        var message = new Message({
          message: req.body.message,
        });

        message._user = user._id;

        message.save(function (err) {
          if (err) res.status(400).send(err);
          else {
            user.messages.push(message);
            user.save(function (err) {
              if (err) res.status(400).send(err);
              else {
                res.redirect('/messages');
              }
            });
          }
        });
      }
    });
  }
}
