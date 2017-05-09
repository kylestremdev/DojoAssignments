var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

// Models
var User = mongoose.model('User');

module.exports = {
  login: function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err) res.status(400).send(err);
      else {
        if (!user) res.status(401).send(["Incorrect Email/Password"]);
        else if (!bcrypt.compareSync(req.body.password, user.password)){
          res.status(401).send(["Incorrect Email/Password"]);
        } else {
          res.json(user);
        }
      }
    });
  },
  register: function (req, res) {
    var newUser = new User({
      name: {
        first: req.body.first_name,
        last: req.body.last_name,
      },
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
    });

    newUser.save(function (err, user) {
      if (err) res.status(400).send(err);
      else {
        res.json(user);
      }
    })
  }
}
