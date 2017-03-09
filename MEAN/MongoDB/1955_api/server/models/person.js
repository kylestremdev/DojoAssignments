var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

mongoose.model('Person', PersonSchema);
