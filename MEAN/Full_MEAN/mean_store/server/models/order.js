var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var OrderSchema = new Schema({
  _customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, "Order must have a customer attached"],
  },
  _product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, "Order must have a product attached"],
  },
  quantity: {
    type: Number,
    validate: {
      validator: function(q) {
        return q > 0;
      },
      message: 'Must order at least one item'
    },
    required: [true, "Order must have a quantity"]
  }
}, {timestamps:true});

OrderSchema.pre('save', function (done) {
  if (this._product.quantity - this.quantity < 0) {
    var err = new Error('Cannot order more then the product\'s remaining quantity');
    done(err);
  } else {
    done();
  }
})

mongoose.model('Order', OrderSchema);
