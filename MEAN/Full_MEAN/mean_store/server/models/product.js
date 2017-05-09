var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Product must have a name"],
  },
  image: {
    type: String,
    required: [true, "Product needs an image"],
  },
  description: {
    type: String,
    required: [true, "Product must have a description"],
  },
  quantity: {
    type: Number,
    required: [true, "Product must have a quantity"],
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
}, {timestamps:true});

ProductSchema.pre('save', function (done) {
  if (this.quantity < 0) {
    done(new Error('Cannot order more than the product quantity'))
  } else {
    done();
  }
})

mongoose.model('Product', ProductSchema);
