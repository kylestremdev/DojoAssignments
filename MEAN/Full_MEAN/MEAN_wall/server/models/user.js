var mongoose  = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema    = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    first: {type: String, required: [true, "Must have a first name"], trim: true},
    last: {type: String, required: [true, "Must have a last name"], trim: true}
  },

  email: {
    type: String,
    unique: true,
    validate: [{
      validator: function (str) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
      },
      message: "{ VALUE } is not a valid email"
    }],
    required: [true, "Must have an email address"]
  },

  password: {
    type: String,
    required: [true, "Must have a password"],
  },

  birthday: {
    type: Date,
    required: [true, "Must have a birthday"]
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {timestamps: true});

UserSchema.methods.hashpw = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UserSchema.pre('save', function (done) {
  this.password = this.hashpw(this.password);
  done();
});

mongoose.model('User', UserSchema);
