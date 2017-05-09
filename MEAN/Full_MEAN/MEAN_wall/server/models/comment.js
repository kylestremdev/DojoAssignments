var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var CommentSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _message: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  comment: {
    type: String,
    required: [true, "Comment cannot be blank"],
  }
}, {timestamps: true});

mongoose.model('Comment', CommentSchema);
