app.factory('postFactory', ['$http', function ($http) {
  var factory = {};

  factory.create = function (topicId, postData, callback) {
    $http.post(('/posts/' + topicId), postData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
