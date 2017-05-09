app.controller('ordersController', ['$scope', '$location', 'customerFactory', 'orderFactory', 'productFactory', function ($scope, $location, customerFactory, orderFactory, productFactory) {
  $scope.orders = [];
  orderFactory.index(function (res) {
    $scope.orders = res.data;
    $scope.orders.forEach(function (order, index) {
      $scope.orders[index].createdAt = new Date(order.createdAt);
    })
  })

  $scope.products = [];
  productFactory.index(function (res) {
    $scope.products = res.data;
  })

  $scope.customers = [];
  customerFactory.index(function (res) {
    $scope.customers = res.data;
  })

  $scope.createOrder = function () {
    orderFactory.create($scope.newOrder, function (res) {
      if (res.status == 200) {
        $scope.orders = res.data;
        $scope.orders.forEach(function (order, index) {
          $scope.orders[index].createdAt = new Date(order.createdAt);
        });
        $scope.errors = {};
      } else {
        if (res.data.code == 201) {
          $scope.errors = [res.data.error];
        } else {
          $scope.errors =[];
          for (var key in res.data) {
            $scope.errors.push(res.data[key].message);
          }
        }
      }
    })
  }
}])
