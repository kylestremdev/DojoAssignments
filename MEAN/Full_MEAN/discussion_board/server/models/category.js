var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }]
});

var Category = mongoose.model('Category', CategorySchema);
