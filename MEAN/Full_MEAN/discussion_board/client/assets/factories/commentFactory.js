app.factory('commentFactory', ['$http', function ($http) {
  var factory = {};

  factory.create = function (post_id, commentData, callback) {
    $http.post(('/comments/' + post_id), commentData).then(function (res) {
      callback(res);
    }, function (res) {
      callback(res);
    })
  }

  return factory;
}])
