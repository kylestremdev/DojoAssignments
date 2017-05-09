var mongoose  = require('mongoose');

// Models
var Product = mongoose.model('Product');

module.exports = {
  index: function(req, res) {
    Product.find({})
    .populate('orders')
    .populate({
      path: 'orders',
      populate: { path: '_product _customer'}
    }).exec(function (err, products) {
      if (err) res.status(400).send(err);
      else {
        res.json(products);
      }
    });
  },
  create: function(req, res) {
    var newProduct = new Product({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      quantity: req.body.quantity
    })

    newProduct.save(function (err) {
      if (err) res.status(400).send(err);
      else {
        res.redirect('/products');
      }
    })
  }
}
