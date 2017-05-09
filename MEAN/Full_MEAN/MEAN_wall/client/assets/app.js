var app = angular.module('wallApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'loginController'
  })
  .when('/register', {
    templateUrl: 'partials/register.html',
    controller: 'registerController'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'homeController'
  })
  .otherwise({
    redirectTo: '/',
  })
})
