var app = angular.module('storeApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/dashboard.html',
    controller: 'dashboardController',
  })
  .when('/orders', {
    templateUrl: 'partials/orders.html',
    controller: 'ordersController',
  })
  .when('/customers', {
    templateUrl: 'partials/customers.html',
    controller: 'customersController',
  })
  .when('/products', {
    templateUrl: 'partials/products.html',
    controller: 'productsController',
  })
  .otherwise({
    redirectTo: '/',
  })
});
