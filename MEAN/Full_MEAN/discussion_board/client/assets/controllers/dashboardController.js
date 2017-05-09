app.controller('dashboardController', ['$scope', '$location', '$cookies', 'topicFactory', 'categoryFactory', function ($scope, $location, $cookies, topicFactory, categoryFactory) {
  if (!$cookies.getObject('user')) {
    $location.url('/');
  } else {
    $scope.user = $cookies.getObject('user');
  }

  $scope.topics = [];
  topicFactory.index(function (res) {
    $scope.topics = res.data;
  });

  $scope.categories = [];
  categoryFactory.index(function (res) {
    $scope.categories = res.data;
  });

  $scope.createTopic = function (topic) {
    topic.user_id = $scope.user._id;
    topicFactory.create(topic, function (res) {
      if (res.status == 200) $scope.topics = res.data;
      else {
        console.log(res);
      }
    })
  }

  $scope.logoutUser = function () {
    $cookies.remove('user');
    $location.url('/');
  }
}])
