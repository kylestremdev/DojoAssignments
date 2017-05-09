app.controller('loginController', ['$scope', '$location', '$cookies', 'userFactory', function ($scope, $location, $cookies, userFactory) {
  if ($cookies.get('user')) {
    $location.url('/home');
  }
  $scope.loginUser = function () {
    userFactory.login($scope.userLogin, function (res) {
      console.log(res);
      if (res.status == 200) {
        $cookies.putObject('user', res.data);
        $location.url('/home');
      } else {
        $scope.errors = res.data;
        $scope.userLogin = {};
      }
    });
  }
}]);
