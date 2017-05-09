app.factory('categoryFactory', ['$http', function ($http) {
  var factory = {};

  factory.index = function (callback) {
    $http.get('/categories').then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
