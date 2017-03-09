var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mongoose_dashboard');

var MongooseSchema = new mongoose.Schema({
  name: String
});

mongoose.model('Mongoose', MongooseSchema);
var Mongoose = mongoose.model('Mongoose');

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req,res) {
  var data = {};

  Mongoose.find({}, function (err, res) {
    data.mongeese = res
  }).then(function () {
    res.render('index', {mongeese: data.mongeese});
  });
});

app.get('/mongooses/new', function (req,res) {
  res.render('create');
});

app.post('/mongooses', function (req,res) {
  var newMongoose = new Mongoose({name: req.body.name});
  newMongoose.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
});

app.get('/mongooses/edit/:id', function (req,res) {
  var data = {};

  Mongoose.findOne({_id: req.params.id}, function (err, mongoose) {
    data.mongoose = mongoose;
  }).then(function () {
    res.render('edit', {mongoose: data.mongoose});
  });
});

app.post('/mongooses/:id', function (req,res) {
  Mongoose.update({_id: req.params.id}, { $set: {name: req.body.name}}, function (err, mongoose) {

  });

  res.redirect('/');
});

var server = app.listen(8000, function () {
  console.log("Server running on port 8000");
});
