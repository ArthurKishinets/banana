'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:TranslatefromtestCtrl
 * @description
 * # TranslatefromtestCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('TranslatefromtestCtrl',  [ '$scope', 'wordsToTrain', 'translate', function ($scope, wordsToTrain, translate) {


  	translate.getWords('translateFrom');

  	$scope.options = translate.getOptions();

  	$scope.currentWord = translate.currentWord();

  	$scope.showExerciseBox = translate.showExerciseBox;

  	$scope.showResults = translate.showResults;

  	$scope.checkAnswer = translate.checkAnswer;

  	$scope.nextWord = translate.nextWord;







  	//console.log(translate.nextWord());

  	//console.log(translate.currentWord);

  }]);
