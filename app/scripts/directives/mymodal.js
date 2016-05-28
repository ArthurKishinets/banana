'use strict';

/**
 * @ngdoc directive
 * @name bananaApp.directive:myModal
 * @description
 * # myModal
 */
angular.module('bananaApp')
  .directive('myModal', function () {
    return {
      templateUrl: 'views/modal.html',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the myModal directive');
        //console.log(scope.word.value);
      },
      scope: {
      	word: '=info',
      	next: '=next',
      	previous: '=prev'
      }

    };
  });
