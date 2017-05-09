var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var CommentSchema = new Schema({
  _post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: [true, "Comment must have some content"]
  }
}, {timestamps: true});

mongoose.model('Comment', CommentSchema);
