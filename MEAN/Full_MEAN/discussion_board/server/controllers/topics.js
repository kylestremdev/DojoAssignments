var mongoose = require('mongoose');

// Models
var Topic     = mongoose.model('Topic'),
    User      = mongoose.model('User'),
    Category  = mongoose.model('Category');



module.exports = {
  index: function (req, res) {
    Topic.find()
    .populate("_category _user")
    .exec()
    .then(function (topics) {
      res.json(topics);
    }, function (err) {
      res.status(400).send(err);
    })
  },
  create: function (req, res) {
    var newTopic = new Topic({
      content: req.body.content,
      description : req.body.description,
    })

    User.findById(req.body.user_id).exec()
    .then(function (user) {
      user.topics.push(newTopic);
      newTopic._user = user;

      return user.save();
    }, function (err) {
      return res.status(400).end("User err");
    })
    .then(function (updatedUser) {
      return Category.findOne({name: req.body.category}).exec();
    }, function (err) {
      return res.status(400).end("User save err");
    })
    .then(function (category) {
      category.topics.push(newTopic);
      newTopic._category = category;

      return category.save();
    }, function (err) {
      return res.status(400).end("Category err");
    })
    .then(function (updatedCategory) {
      return newTopic.save();
    }, function (err) {
      return res.status(400).end("Category save err");
    })
    .then(function (topic) {
      return res.redirect('/topics');
    }, function (err) {
      return res.status(400).end("Topic save err");
    })
  },
  show: function (req, res) {
    Topic.findOne({_id: req.params.topic})
    .populate('_user _category posts')
    .populate({
      path: 'posts',
      populate: { path: '_user'}
    })
    .populate({
      path: 'posts',
      populate: {
        path: 'comments',
        populate: { path: '_user'}
      }
    })
    .exec()
    .then(function (topic) {
      return res.json(topic);
    }, function (err) {
      return res.status(400).end(err);
    });
  }
}
