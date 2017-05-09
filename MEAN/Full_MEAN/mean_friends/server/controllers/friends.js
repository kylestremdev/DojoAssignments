var mongoose  = require('mongoose');

// Models
var Friend = mongoose.model('Friend');

module.exports = {
  index: function (req, res) {
    Friend.find({}, function (err, friends) {
      if (err) throw err;
      else res.json(friends);
    })
  },
  create: function (req, res) {
    var newFriend = new Friend({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.birthday,
    });

    newFriend.save(function (err) {
      if (err) throw err;
      else res.redirect('/friends');
    });
  },
  update: function (req, res) {
    Friend.findOne({_id: req.params.id}, function (err, friend) {
      if (err) throw (err);

      friend.first_name = req.body.first_name;
      friend.last_name = req.body.last_name;
      friend.birthday = req.body.birthday;

      friend.save(function (err) {
        if (err) console.log(err);
        else res.status(200).send("Updated Friend Successfully");
      });
    });
  },
  delete: function (req, res) {
    Friend.remove({_id: req.params.id}, function (err) {
      if (err) throw err;
      else res.status(200).send("Deleted Friend Successfully");
    })
  },
  show: function (req, res) {
    Friend.findById(req.params.id, function (err, friend) {
      if (err) throw err;
      else res.json(friend);
    });
  },
}
