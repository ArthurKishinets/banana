'use strict';

/**
 * @ngdoc directive
 * @name bananaApp.directive:round
 * @description
 * # round
 */
angular.module('bananaApp')
  .directive('round', function () {
    return {
      template: '<span class="badge"> </span>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        if ( scope.word.translateFrom && scope.word.translateInto && scope.word.trainingCart) {
        	element.find('span').css({
        		"backgroundColor": "green"
        	});
        }
        else if ( scope.word.translateFrom || scope.word.translateInto || scope.word.trainingCart) {
        	element.find('span').css({
        		"backgroundColor": "yellow"
        	});
        }
        else {
        	element.find('span').css({
        		"backgroundColor": "red"
        	});
        }
      }
    };
  });
