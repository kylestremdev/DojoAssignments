app.controller('usersController', ['$scope', '$location', '$cookies', 'userFactory', function ($scope, $location, $cookies, userFactory) {
  if (!$cookies.getObject('user')) {
    $location.url('/');
  } else {
    $scope.user = $cookies.getObject('user');
    $location.url('/dashboard');
  }

  $scope.login = function (user) {
    userFactory.login(user, function (res) {
      console.log(res);
      if (res.status == 200) {
        $cookies.putObject('user', res.data);
        $location.url('/dashboard');
      } else {
        $scope.errors = res.data;
      }
    })
  }
}])
