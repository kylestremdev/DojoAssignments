var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req,res) {
  res.render('index');
});

app.post('/result', function (req, res) {
  res.render('result', {postData: req.body});
});

app.listen(8000, function () {
  console.log("Server running on post 8000");
})
