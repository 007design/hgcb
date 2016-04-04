/* global angular */

"use strict";

angular.module('app', [])

.config(['$interpolateProvider', '$locationProvider', function($interpolateProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled:true,requireBase:false});
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
}])

.directive('accordion', ['$window', function($window) {
  return {
    restrict: 'C',
    scope: true,
    link: function(scope, elem) {
    }
  };
}])

.service('dataSvc', ['$http', '$location', function($http, $location) {
  var scope = this;

  if ($location.search().c)
    $http({
      url: '/getCharacter',
      method: 'GET',
      params: {c: $location.search().c},
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  .success(function(result) {
    if (result.status === 'success')
      scope.character = result.character;
  });

  scope.saveCharacter = function() {
    if (!scope.character.name)
      return alert('Character must have a name');

    $http({
      url: '/saveCharacter',
      method: 'POST',
      data: scope.character,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .success(function(result) {
      if (result.redirect)
        window.location.href = result.redirect;
      else console.log(result);
    })
  };

  scope.skillsList = [
    'Acrobatics',
    'Aircraft Pilot',
    'Animal Handling',
    'Archery',
    'Athletics',
    'Bureaucracy',
    'Business',
    'Camoflage',
    'Combat Sense',
    'Communications',
    'Computer',
    'Cooking',
    'Craft (S)',
    'Dance',
    'Demolition',
    'Disguise',
    'Dodge',
    'Drive',
    'Earth Sciences (S)',
    'Electronic Design',
    'Electronic Warfare',
    'Electronics',
    'Etiquette',
    'First Aid',
    'Focus',
    'Foreign Language (S)',
    'Forgery',
    'Forward Observation',
    'G-Handling',
    'Gambling',
    'General Sciences',
    'Grooming',
    'Gunnery',
    'Haggling',
    'Hand-to-Hand',
    'Heavy Gear Architecture',
    'Heavy Gear Dueling',
    'Heavy Gear Pilot',
    'Hovercraft Pilot',
    'Interrogation',
    'Intimidation',
    'Investigation',
    'Law',
    'Leadership',
    'Life Sciences (S)',
    'Literature',
    'Marksmanship',
    'Mechanical Design',
    'Mechanics',
    'Medicine',
    'Melee',
    'Music',
    'Naval Pilot',
    'Navigation (S)',
    'Notice',
    'Parachuting',
    'Parry',
    'Physical Sciences (S)',
    'Psychology',
    'Mental Conditioning',
    'Riding',
    'Security',
    'Seduction',
    'Slight of Hand',
    'Small Arms',
    'Social Sciences (S)',
    'Space Pilot',
    'Stealth',
    'Streetwise',
    'Strider Pilot',
    'Survival',
    'Swimming',
    'Tactics',
    'Teaching',
    'Theatrics',
    'Throwing',
    'Tinker',
    'Visual Art'
  ];

  scope.character = {
    primaryTraits: {
      agi: 0,
      app: 0,
      bld: 0,
      cre: 0,
      fit: 0,
      inf: 0,
      kno: 0,
      per: 0,
      psy: 0,
      wil: 0
    },
    secondaryTraits: {
      str: 0,
      hea: 0,
      sta: 0,
      ud: 0,
      ad: 0
    },
    skills: []
  };

  return scope;
}])

.controller('CharacterCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  $scope.skillsList = dataSvc.skillsList;

  $scope.$watch(function() {
    return dataSvc.character
  }, function (c) {
    $scope.character = c;
  }, true);

  $scope.addSkill = function() {
    $scope.character.skills.push({});
  };

  $scope.removeSkill = function(i) {
    $scope.character.skills.splice(i,1);
  };

  $scope.saveCharacter = function() {
    dataSvc.saveCharacter();
  };

  $scope.newCharacter = function() {
    window.location.href = '/characterSheet';
  };

  $scope.listCharacters = function() {
    window.location.href = '/characters';
  };

  $scope.logout = function() {
    window.location.href = '/logout';
  };

  $scope.login = function() {
    window.location.href = '/';
  };
}]);
