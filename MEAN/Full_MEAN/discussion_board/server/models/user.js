var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must have a name"],
    unique: true,
  },
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic',
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, {timestamps:true});

mongoose.model('User', UserSchema);
