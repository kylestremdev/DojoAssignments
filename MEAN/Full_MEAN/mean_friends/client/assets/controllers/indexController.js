app.controller('indexController', ['$scope', '$location', 'friendFactory', function ($scope, $location, friendFactory) {
  $scope.friends = [];
  friendFactory.index(function (res) {
    $scope.friends = res.data;
  })
}])
