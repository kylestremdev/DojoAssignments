var app = angular.module('discussionApp', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'usersController'
  })
  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html',
    controller: 'dashboardController'
  })
  .when('/topic/:topic_id', {
    templateUrl: 'partials/topic.html',
    controller: 'topicsController'
  })
  .when('/user/:user_id', {
    templateUrl: 'partials/user.html',
    controller: 'showUserController'
  })
  .otherwise({
    redirectTo: '/'
  })
});
