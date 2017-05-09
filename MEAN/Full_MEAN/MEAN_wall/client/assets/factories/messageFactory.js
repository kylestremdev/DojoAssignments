app.factory('messageFactory', ['$http', function ($http) {
  var factory = {};

  factory.index = function (callback) {
    $http.get('/messages').then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    });
  };

  factory.create = function (messageData, callback) {
    $http.post('/messages', messageData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    });
  };

  return factory;
}])
