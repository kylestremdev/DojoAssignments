var mongoose = require('mongoose');

// Models
var Category = mongoose.model('Category');

module.exports = {
  index: function (req, res) {
    Category.find().exec()
    .then(function (categories) {
      res.json(categories);
    }, function (err) {
      res.status(400).send(err);
    })
  }
}
