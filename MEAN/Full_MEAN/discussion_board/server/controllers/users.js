var mongoose = require('mongoose');

// Models
var User = mongoose.model('User');

module.exports = {
  show: function (req, res) {
    User.aggregate(
      [{$match: {_id: mongoose.Types.ObjectId(req.params.id)}},{$project: {name: 1, topics: {$size: '$topics'}, posts: {$size: '$posts'}, comments: {$size: '$comments'}}}],
      function (err, data) {
        if (err) res.status(400).send(err);
        else {
          res.json(data[0]);
        }
      }
    )
  },

  login: function (req, res) {
    User.findOne({name: req.body.name}).exec()
    .then(function (user) {
      if (user) res.json(user);
      else {
        var newUser = new User({
          name: req.body.name,
        })

        return newUser.save();
      }
    }, function (err) {
      res.status(400).send(err);
    }).then(function (newUser) {
      res.json(newUser);
    }, function (err) {
      res.status(400).send(err);
    })
  }
}
