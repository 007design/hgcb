/* global angular */

"use strict";

angular.module('app', [])

.service('dataSvc', ['$http', function($http) {
  var scope = this;

  scope.getCharacters = function() {
    return $http({
      url: '/getCharacters',
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
  };

  scope.deleteCharacter = function(id) {
  	return $http({
  		url: '/deleteCharacter',
  		method: 'GET',
  		params: {c: id}
  	});
  };

  return scope;
}])

.controller('CharacterListCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  function getCharacters() {
	  dataSvc.getCharacters().success(function(list) {
	    $scope.characters = list;
	  });
	}

	getCharacters();

  $scope.deleteCharacter = function(id) {
  	dataSvc.deleteCharacter(id).then(function(resp) {
  		if (resp.data.redirect)
  			window.location.href = resp.data.redirect;
  		else
  			getCharacters();
  	});
  };
}]);
