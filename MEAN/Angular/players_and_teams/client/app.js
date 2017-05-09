var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/players.html',
    controller: 'PlayersController'
  })
  .when('/teams', {
    templateUrl: 'partials/teams.html',
    controller: 'TeamsController'
  })
  .when('/associations', {
    templateUrl: 'partials/associations.html',
    controller: 'AssociationsController'
  })
  .otherwise({
    redirect: '/'
  });
});

app.factory('playerFactory', function () {
  var players = [];

  var factory = {};

  factory.index = function (callback) {
    callback(players);
  }

  factory.create = function (player, callback) {
    players.push(player);
    callback(players);
  }

  factory.delete = function (index, callback) {
    players.splice(index, 1);
    callback(players);
  }

  factory.getPlayer = function (index, callback) {
    callback(players[index]);
  }

  return factory;
});

app.factory('teamFactory', function () {
  var teams = [];

  var factory = {};

  factory.index = function (callback) {
    callback(teams);
  }

  factory.create = function (team, callback) {
    teams.push(team);
    callback(teams);
  }

  factory.delete = function (index, callback) {
    teams.splice(index, 1);
    callback(teams);
  }

  factory.getTeam = function (index, callback) {
    callback(teams[index]);
  }

  return factory;
});

app.controller('PlayersController', ['$scope', 'playerFactory', function ($scope, playerFactory) {
  $scope.players = [];
  playerFactory.index(function (data) {
    $scope.players = data;
  });

  $scope.addPlayer = function () {
    playerFactory.create($scope.newPlayer, function (data) {
      $scope.players = data;
    });
    $scope.newPlayer = "";
  }

  $scope.removePlayer = function (index) {
    playerFactory.delete(index, function (data) {
      $scope.players = data;
    });
  }
}]);

app.controller('TeamsController', ['$scope', 'teamFactory', function ($scope, teamFactory) {
  $scope.teams = [];
  teamFactory.index(function (data) {
    $scope.teams = data;
  });

  $scope.addTeam = function () {
    teamFactory.create($scope.newTeam, function (data) {
      $scope.teams = data;
    });
    $scope.newTeam = "";
  }

  $scope.removeTeam = function (index) {
    teamFactory.delete(index, function (data) {
      $scope.teams = data;
    });
  }
}]);

app.controller('AssociationsController', ['$scope', 'playerFactory', 'teamFactory', function ($scope, playerFactory, teamFactory) {
  $scope.associations = [];
  $scope.players = [];
  playerFactory.index(function (data) {
    $scope.players = data;
  });

  $scope.teams = [];
  teamFactory.index(function (data) {
    $scope.teams = data;
  });

  $scope.addAssociation = function () {
    $scope.associations.push({
      player: $scope.players[$scope.newAssociation.player_idx],
      team: $scope.teams[$scope.newAssociation.team_idx]
    });
  }

  $scope.removeAssociation = function (index) {
    $scope.associations.splice(index, 1);
  }
}]);
