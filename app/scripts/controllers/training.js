'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:TrainingCtrl
 * @description
 * # TrainingCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('TrainingCtrl', [ '$scope', 'wordsToTrain', function ($scope, wordsToTrain) {

  	//$scope.count = wordsToTrain();
  	wordsToTrain();
  	//console.log($scope.count);

  }]);
