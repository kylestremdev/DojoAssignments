var mongoose  = require('mongoose');

// Models
var Product   = mongoose.model('Product'),
    Order     = mongoose.model('Order'),
    Customer  = mongoose.model('Customer');

module.exports = {
  index: function (req, res) {
    Order.find({})
    .populate('_customer _product')
    .exec(function (err, orders) {
      if (err) res.status(400).send(err);
      else {
        res.json(orders);
      }
    });
  },
  create: function (req, res) {
    var newOrder = new Order({
      quantity: parseInt(req.body.quantity) || 0,
    })

    var order_customer = {};
    var order_product = {};
    var customer_promise = Customer.findById(req.body.customer_id).exec();
    customer_promise.then(function (customer) {
      order_customer = customer;

      return Product.findById(req.body.product_id).exec();
    }, function (err) {
      res.status(400).send(err);
    }).then(function (product) {
      order_product = product;

      order_product.quantity -= newOrder.quantity;

      return order_product.save();
    }, function (err) {
      res.status(400).send(err);
    }).then(function (updated_product) {
      order_product = updated_product;

      newOrder._customer = order_customer;
      newOrder._product = order_product;

      return newOrder.save();
    }, function (err) {
      return res.status(400).send(err.errors || {code:201, error: err.message});
    }).then(function (new_order) {
      return res.redirect('/orders');
    }, function (err) {
      return res.status(400).send(err.errors || {code:201, error: err.message});
    }).catch(function () {});
  }
}
