app.factory('userFactory', ['$http', function ($http) {
  var factory = {};

  factory.login = function (loginData, callback) {
    $http.post('/login', loginData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    });
  };

  factory.register = function (registerData, callback) {
    $http.post('/register', registerData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    });
  };

  return factory;
}])
