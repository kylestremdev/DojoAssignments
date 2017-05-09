app.factory('friendFactory', ['$http', function ($http) {
  var friends = [];

  var factory = {};

  factory.index = function (callback) {
    $http.get('/friends').then(function (res) {
      callback(res);
    })
  };

  factory.create = function (newFriend, callback) {
    $http.post('/friends', newFriend).then(function (res) {
      callback(res);
    })
  };

  factory.show = function (id, callback) {
    $http.get('/friends/' + id).then(function (res) {
      callback(res);
    });
  };

  factory.update = function (id, data, callback) {
    $http.put(('/friends/' + id), data).then(function (res) {
      callback(res);
    });
  };

  factory.delete = function (id, callback) {
    $http.delete('/friends/' + id).then(function (res) {
      callback(res);
    })
  }

  return factory;
}])
