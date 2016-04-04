/* global angular */

"use strict";

angular.module('app', [])

.directive('accordion', ['$window', function($window) {
  return {
    restrict: 'C',
    scope: true,
    link: function(scope, elem) {
      $($window).on('resize', function() {
        if ($('.mobile-only').is(':visible'))
          scope.showAccordion = false;
        scope.$apply();
      });
    }
  };
}])

.directive('skillsTable', [function() {
  return {
    restrict: 'C',
    scope: true,
    link: function(scope, elem) {
      scope.skills = [];

      scope.addSkill = function() {
        scope.skills.push({});
      };

      scope.removeSkill = function(i) {
        scope.skills.splice(i,1);
      };
    }
  };
}]);
