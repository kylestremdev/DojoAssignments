app.factory('customerFactory', ['$http', function ($http) {
  var factory = {};

  factory.index = function (callback) {
    $http.get('/customers').then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  };

  factory.create = function (customerData, callback) {
    $http.post('/customers', customerData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  };

  return factory;
}])
