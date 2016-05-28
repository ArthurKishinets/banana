'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('DictCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.words = window.words, $scope.modalWord = {}, $scope.isModalShown = false;
    var wordIndex = 0;
    /*$http({
  		method: 'GET',
  		url: '../../json/words.json'
  	}).then(function success(response) {
  		//alert('yes');
  		$scope.words = response.data;
      $scope.modalWord = $scope.words[0];
  		console.log($scope.modalWord);
  	},
  	function error() {
  		console.log('no');
  	});*/

    $scope.toogleModal = function($event) {
      $scope.isModalShown = !$scope.isModalShown;

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

    }

  }]);
