app.controller('editController', ['$scope', '$location', '$routeParams', 'friendFactory', function ($scope, $location, $routeParams, friendFactory) {
  $scope.friend = {};
  $scope.birthday = "";
  friendFactory.show($routeParams.id, function (res) {
    $scope.friend = res.data;
    $scope.friend.birthday = new Date($scope.friend.birthday);
    $scope.birthday = $scope.friend.birthday.toString();
  });

  $scope.updateFriend = function () {
    friendFactory.update($scope.friend._id, $scope.friend, function (res) {
      if (res.status == 200) {
        $location.url('/');
      }
    });
  }
}]);
