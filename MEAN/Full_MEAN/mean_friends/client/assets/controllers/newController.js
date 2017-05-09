app.controller('newController', ['$scope', '$location', 'friendFactory', function ($scope, $location, friendFactory) {
  $scope.friends = [];
  friendFactory.index(function (res) {
    $scope.friends = res.data;
  });

  $scope.createFriend = function () {
    friendFactory.create($scope.newFriend, function (res) {
      $scope.friends = res.data;
      $scope.newFriend = {};
      $location.url('/');
    });
  }

  $scope.deleteFriend = function (id) {
    friendFactory.delete(id, function (res) {
      if (res.status == 200) {
        friendFactory.index(function(res2) {
          $scope.friends = res2.data;
        })
      }
    })
  }
}])
