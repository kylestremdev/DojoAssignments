var mongoose  = require('mongoose');

// Models
var Product   = mongoose.model('Product'),
    Order     = mongoose.model('Order'),
    Customer  = mongoose.model('Customer');

module.exports = {
  index: function (req, res) {
    Customer.find({})
    .populate('orders')
    .populate({
      path: 'orders',
      populate: { path: '_product _customer'}
    })
    .exec(function (err, customers) {
      if (err) res.status(400).send(err);
      else {
        res.json(customers);
      }
    })
  },
  create: function (req, res) {
    var newCustomer = new Customer({
      name: req.body.name,
    })

    newCustomer.save(function (err) {
      if (err) res.status(400).send(err);
      else {
        res.redirect('/customers');
      }
    })
  }
}
