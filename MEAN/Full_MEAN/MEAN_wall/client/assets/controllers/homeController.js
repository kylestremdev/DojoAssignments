app.controller('homeController', ['$scope', '$location', '$cookies', 'messageFactory', 'commentFactory', function ($scope, $location, $cookies, messageFactory, commentFactory) {
  $scope.messages = [];
  messageFactory.index(function (res) {
    $scope.messages = res.data;
  });

  if (!($cookies.getObject('user'))) {
    $location.url('/');
  } else {
    $scope.user = $cookies.getObject('user');
  }

  $scope.logoutUser = function () {
    $cookies.remove('user');
    $location.url('/');
  }

  $scope.createMessage = function () {
    $scope.newMessage.user_id = $scope.user._id;
    messageFactory.create($scope.newMessage, function (res) {
      $scope.messages = res.data;
    })
  }

  $scope.createComment = function (data, message_id) {
    data.user_id = $scope.user._id;
    data.message_id = message_id;
    commentFactory.create(data, function (res) {
      $scope.messages = res.data;
    })
  }
}])
