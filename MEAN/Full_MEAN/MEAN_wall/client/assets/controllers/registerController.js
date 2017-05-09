app.controller('registerController', ['$scope', '$location', '$cookies', 'userFactory', function ($scope, $location, $cookies, userFactory) {
  if ($cookies.get('user')) {
    $location.url('/home');
  }
  $scope.registerUser = function () {
    if (!($scope.userRegister.password && $scope.userRegister.password_confirmation)) {
      $scope.errors = ['Passwords are required'];
    } else if($scope.userRegister.password == $scope.userRegister.password_confirmation) {
      userFactory.register($scope.userRegister, function (res) {
        if (res.status == 200) {
          $cookies.putObject('user', res.data);
          $location.url('/home');
        } else {
          if (res.data.errors) {
            var errors = Object.keys(res.data.errors).map(function (errobj) {
              return res.data.errors[errobj].message;
            })
            $scope.errors = errors;
          } else {
            if (res.data.code == 11000) {
              $scope.errors = ["Email already taken"];
            } else {
              $scope.errors = res.data;
            }
          }
        }
      });
    } else {
      $scope.errors = ['Passwords Must Match']
    }
  }
}])
