app.factory('userFactory', ['$http', function ($http) {
  var factory = {};

  factory.login = function (userData, callback) {
    $http.post('/user', userData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  factory.show = function (id, callback) {
    $http.get('/user/' + id).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
