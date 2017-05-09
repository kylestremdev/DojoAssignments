app.factory('topicFactory', ['$http', function ($http) {
  var factory = {};

  factory.index = function (callback) {
    $http.get('/topics').then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    });
  }

  factory.create = function (topicData, callback) {
    $http.post('/topics', topicData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  factory.show = function (id, callback) {
    $http.get('/topics/' + id).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}]);
