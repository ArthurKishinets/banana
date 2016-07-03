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

  	console.log(wordsToTrain('translateFrom').wordsToTrain);
  	wordsToTrain('translateFrom').wordsToTrain;
  	wordsToTrain('translateFrom').disabled();

  	console.log(wordsToTrain('translateFrom').wordsToTrain);
  	wordsToTrain('translateInto').wordsToTrain;
  	wordsToTrain('translateInto').disabled();

  	

  }]);
