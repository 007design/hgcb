/* global angular */

"use strict";

angular.module('app', [])

.directive('accordion', ['$window', function($window) {
  return {
    restrict: 'C',
    scope: true,
    link: function(scope, elem) {
    }
  };
}])

.service('dataSvc', [function() {
  var scope = this;

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

.controller('IdentificationCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  $scope.character = dataSvc.character;
}])

.controller('PrimaryTraitsCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  $scope.primaryTraits = dataSvc.character.primaryTraits;
}])

.controller('SecondaryTraitsCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  $scope.secondaryTraits = dataSvc.character.secondaryTraits;
}])

.controller('SkillsTableCtrl', ['$scope', 'dataSvc', function($scope, dataSvc) {
  $scope.skills = dataSvc.character.skills;
  $scope.skillsList = dataSvc.skillsList;

  $scope.addSkill = function() {
    $scope.skills.push({});
  };

  $scope.removeSkill = function(i) {
    $scope.skills.splice(i,1);
  };
}]);
