var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/message_board');

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Must have a name"]},
  message: {type: String, required: [true, "Must have a message"]},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

var CommentSchema = new mongoose.Schema({
  _message: {type: Schema.Types.ObjectId, ref: 'Message'},
  text: {type: String, required: [true, 'Must have a comment']},
  name: {type: String, required: [true, "Must have a name"]}
}, {timestamps: true});

mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {

  var data = {};
  Message.find({})
  .populate('comments')
  .exec(function (err, messages) {
    if (err) console.log(err);
    else {
      res.render('index', {messages: messages});
    }
  })
});

app.post('/message', function (req, res) {
  var message = new Message({
    name: req.body.name,
    message: req.body.message
  });

  message.save(function (err) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log("created new message");
      res.redirect('/');
    }
  });
});

app.post('/messages/:id/comment', function (req, res) {
  Message.findOne({_id: req.params.id}, function (err, message) {
    var comment = new Comment({
      name: req.body.name,
      text: req.body.comment,
      _message: message._id
    });

    comment.save(function (err) {
      message.comments.push(comment);
      message.save(function (err) {
        if (err) console.log(err);
        else {
          res.redirect('/');
        }
      });
    });
  });
});

var server = app.listen(8000, function () {
  console.log("Server running on port 8000");
});
