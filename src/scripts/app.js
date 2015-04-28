angular.module('app', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .when('/getUsers', {
      templateUrl: 'templates/usersList.html',
      controller: 'UsersListCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    });
}])
.controller('LoginCtrl', ['$scope', function($scope){

}])
.controller('UsersListCtrl', ['$scope', '$http', function($scope, $http){
  $http.get('/getUsers')
    .success(function(data){
      $scope.users = data;
    });
}])
.factory('User', function () {
  return function User (u) {
    this.name = u.name;
  };
});;