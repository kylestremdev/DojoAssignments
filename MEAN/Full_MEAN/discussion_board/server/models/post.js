var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var PostSchema = new Schema({
  _topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, "Post must have some content"]
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }]
}, {timestamps:true});

mongoose.model('Post', PostSchema);
