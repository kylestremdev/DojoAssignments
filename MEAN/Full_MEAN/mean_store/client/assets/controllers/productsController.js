app.controller('productsController', ['$scope', '$location', 'productFactory', function ($scope, $location, productFactory) {
  $scope.products = [];
  productFactory.index(function (res) {
    $scope.products = res.data;
    console.log(res);
  });

  $scope.createProduct = function () {
    productFactory.create($scope.newProduct, function (res) {
      $scope.products = res.data;
      $scope.newProduct = {};
    })
  }
}])
