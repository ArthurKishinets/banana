'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:TrainingcartCtrl
 * @description
 * # TrainingcartCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('TrainingcartCtrl', [ 'trainingCart', '$scope', '$interval', function (trainingCart, $scope, $interval) {

  	trainingCart.init();
  	trainingCart.nextPic();

  	$scope.showExerciseBox = trainingCart.showExerciseBox;
  	$scope.showResults = trainingCart.showResults;

  	$scope.currentWord = trainingCart.currentWord;

  	$scope.rightAnswer = trainingCart.rightAnswer;
  	$scope.wrongAnswer = trainingCart.wrongAnswer;

  	$scope.rightAnswerArr = trainingCart.rightAnswerArr();
  	$scope.wrongAnswerArr = trainingCart.wrongAnswerArr();

  }]);