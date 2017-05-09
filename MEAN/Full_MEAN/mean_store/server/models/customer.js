var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var CustomerSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Customer must have a name"]
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
}, {timestamps:true});

mongoose.model('Customer', CustomerSchema);
