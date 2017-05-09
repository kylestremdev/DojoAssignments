// Controllers
var products  = require('./../controllers/products.js'),
    orders    = require('./../controllers/orders.js'),
    customers = require('./../controllers/customers.js'),
    store     = require('./../controllers/store.js');

module.exports = function (app) {
  app.get('/', store.index);
  app.get('/products', products.index);
  app.post('/products', products.create);
  app.get('/customers', customers.index);
  app.post('/customers', customers.create);
  app.get('/orders', orders.index);
  app.post('/orders', orders.create);
}
