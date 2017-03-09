var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
  name: { type: String, required: true},
  quote: { type: String, required: true}
}, {timestamps: true});

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/quotes', function (req, res) {
  var quote = new Quote({
    name: req.body.name,
    quote: req.body.quote
  });

  quote.save(function (err) {
    if (err) {
      console.log(quote.errors);
      res.render('errors', {errors: quote.errors})
    } else {
      res.redirect('/quotes')
    }
  });
});

app.get('/quotes', function (req, res) {
  data = {};

  Quote.find({}, function (err, quotes) {
    data.quotes = quotes;
  }).then(function () {
    res.render('quotes', {quotes: data.quotes});
  })
});

var server = app.listen(8000, function () {
  console.log("Server running on port 8000");
})
