app.controller('customersController', ['$scope', '$location', 'customerFactory', function ($scope, $location, customerFactory) {
  $scope.customers = [];
  customerFactory.index(function (res) {
    $scope.customers = res.data;
    $scope.customers.forEach(function (cust, index) {
      $scope.customers[index].createdAt = new Date(cust.createdAt);
    })
  });

  $scope.createCustomer = function () {
    customerFactory.create($scope.newCustomer, function (res) {
      if (res.status != 400) {
        $scope.customers = res.data;
        $scope.errors = [];
      } else {
        if (res.data.errmsg) {
          $scope.errors = ["Customer already exists"];
        } else {
          $scope.errors = [];
          for (var key in res.data.errors) {
            $scope.errors.push(res.data.errors[key].message);
          }
        }
      }
      $scope.newCustomer = {};
    })
  }
}])
