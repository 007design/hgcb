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

  scope.updateSecondaryTraits = function() {
    // STR = BLD + FIT / 2 (round down)
    scope.character.secondaryTraits.str = Math.floor((scope.character.primaryTraits.bld + scope.character.primaryTraits.fit)/2);
    // HEA = FIT + PSY + WIL / 3 (round off)
    scope.character.secondaryTraits.hea = Math.round((scope.character.primaryTraits.fit + scope.character.primaryTraits.psy + scope.character.primaryTraits.wil)/3)
    // STA = (BLD + HEA) * 5 + 25, min 10
    var sta = ((scope.character.primaryTraits.bld + scope.character.secondaryTraits.hea)*5)+25;
    scope.character.secondaryTraits.sta = sta > 10 ? sta : 10;
    // UD = 3 + Hand to Hand Level + STR + BLD, min 1
    var ud = getSkillLevel('Hand-to-Hand') + scope.character.secondaryTraits.str + scope.character.primaryTraits.bld + 3;
    scope.character.secondaryTraits.ud = ud > 1 ? ud : 1;
    // AD = 3 + Melee Level + STR + BLD, min 1
    var ad = getSkillLevel('Melee') + scope.character.secondaryTraits.str + scope.character.primaryTraits.bld + 3;
    scope.character.secondaryTraits.ad = ad > 1 ? ad : 1;
  };

  function getSkillLevel(name) {
    for (var a=0; a<scope.character.skills.length; a++) {
      if (scope.character.skills[a].name === name)
        return scope.character.skills[a].level || 0;
    }
    return 0;
  }

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
    skills: [],
    weapons: []
  };

  return scope;
}])

.controller('CharacterCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  $scope.skillsList = dataSvc.skillsList;
  $scope.dataSvc = dataSvc;

  $scope.$watch(function() {
    return dataSvc.character;
  }, dataSvc.updateSecondaryTraits, true);

  $scope.addSkill = function() {
    if (!dataSvc.character.skills) dataSvc.character.skills = [];
    dataSvc.character.skills.push({});
  };

  $scope.removeSkill = function(i) {
    dataSvc.character.skills.splice(i,1);
  };

  $scope.addWeapon = function() {
    if (!dataSvc.character.weapons) dataSvc.character.weapons = [];
    dataSvc.character.weapons.push({});
  };

  $scope.removeWeapon = function(i) {
    dataSvc.character.weapons.splice(i,1);
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
}])

.directive('rangeFormatter', [function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      
    }
  };
}]);
