require('./../models/person.js');
var mongoose = require('mongoose');

var Person = mongoose.model('Person');

module.exports = {
  index: function (req, res) {
    Person.find({}, function (err, people) {
      if (err) res.json(people.errors);
      else res.json(people);
    })
  },
  create: function (req, res) {
    var new_person = new Person({
      name: req.params.name
    });
    new_person.save(function (err) {
      if (err) res.json(err);
      else res.json(new_person);
    })
  },
  delete: function (req, res) {
    Person.remove({name: req.params.name}, function (err) {
      if (err) res.json(err);
      else res.redirect('/');
    })
  },
  show: function (req, res) {
    Person.findOne({name: req.params.name}, function (err, person) {
      if (err) res.json(err);
      else res.json(person);
    })
  }
}
