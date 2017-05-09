var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var TopicSchema = new Schema({
  content: {
    type: String,
    required: [true, "Must have a topic"],
  },
  description: {
    type: String,
    required: [true, "Add some information about your topic"],
  },
  _category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {timestamps:true});

mongoose.model('Topic', TopicSchema);
