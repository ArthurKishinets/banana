'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('DictCtrl', ['$scope', '$http', 'dictionary', function ($scope, $http, dictionary) {
    $scope.modalWord = {}, $scope.isModalShown = false;
    var wordIndex = 0;

    $scope.words = JSON.parse(localStorage.words);

    $scope.toogleModal = function($event) {

      $scope.isModalShown = !$scope.isModalShown;
      $scope.modalWord = $event;
      console.log('event', $event, 'word', $scope.modalWord);

    };

    $scope.next = function() {
      if ( (wordIndex + 1) >= $scope.words.length) {
        wordIndex = -1;
      }
      $scope.modalWord = $scope.words[++wordIndex];
    };

    $scope.previous = function() {
      if( wordIndex === 0 ) {
        wordIndex = $scope.words.length;
      }
      $scope.modalWord = $scope.words[--wordIndex];

    };

    $scope.chooseWord = dictionary.chooseWord;

    $scope.addWords = dictionary.addWords;

    $scope.checkAll = dictionary.checkAll;

  }]);
