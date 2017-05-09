app.controller('showUserController', ['$scope', '$location', '$cookies', '$routeParams', 'userFactory', function($scope, $location, $cookies, $routeParams, userFactory) {
  var user = $cookies.getObject('user');
  if (user) {
    $scope.user = user;
  } else {
    $location.url('/');
  }

  $scope.logoutUser = function () {
    $cookies.remove('user');
    $location.url('/');
  }

  $scope.showUser = {};
  userFactory.show($routeParams.user_id, function (res) {
    console.log(res);
    if (res.status == 200) $scope.showUser = res.data;
    else console.log(res);
  })
}])
