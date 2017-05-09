app.factory('productFactory', ['$http', function ($http) {
  var factory = {};

  factory.index = function (callback) {
    $http.get('/products').then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    });
  };

  factory.create = function (productData, callback) {
    $http.post('/products', productData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
