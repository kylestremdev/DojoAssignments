app.factory('orderFactory', ['$http', function ($http) {
  var factory = {};

  factory.index = function (callback) {
    $http.get('/orders').then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  };

  factory.create = function (orderData, callback) {
    $http.post('/orders', orderData).then(function(res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
