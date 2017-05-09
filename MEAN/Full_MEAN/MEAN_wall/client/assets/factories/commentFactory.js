app.factory('commentFactory', ['$http', function ($http) {
  var factory = {};

  factory.create = function (commentData, callback) {
    $http.post('/comment', commentData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    });
  };

  return factory;
}])
