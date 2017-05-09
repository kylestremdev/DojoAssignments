app.controller('topicsController', ['$scope', '$location', '$cookies', '$routeParams', 'topicFactory', 'postFactory', 'commentFactory', function ($scope, $location, $cookies, $routeParams, topicFactory, postFactory, commentFactory) {
  var user = $cookies.getObject('user');
  if (user) {
    $scope.user = user;
  } else {
    $location.url('/');
  }
  $scope.topic = {};
  topicFactory.show($routeParams.topic_id, function (res) {
    if (res.status == 200) $scope.topic = res.data;
    else console.log(res);
  });

  $scope.createPost = function (post) {
    post.user_id = $scope.user._id;
    postFactory.create($scope.topic._id, post, function (res) {
      if (res.status == 200) {
        $scope.topic = res.data;
      } else {
        console.log(res);
      }
    })
  }

  $scope.createComment = function (comment, post_id) {
    comment.user_id = $scope.user._id;
    comment.topic_id = $scope.topic._id;
    console.log(comment, post_id);
    commentFactory.create(post_id, comment, function (res) {
      if (res.status == 200) $scope.topic = res.data;
      else console.log(res);
    })
  }

  $scope.logoutUser = function () {
    $cookies.remove('user');
    $location.url('/');
  }
}])
