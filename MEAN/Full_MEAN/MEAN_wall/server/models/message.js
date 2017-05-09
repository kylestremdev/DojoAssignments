var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var MessageSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: [true, "Message cannot be blank"]
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {timestamps: true});

mongoose.model('Message', MessageSchema);
