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

  	//$scope.$timeout( alert('lil'), 15000 );
  	trainingCart.init();
  	trainingCart.nextPic();
  	//console.log();

  	$scope.showExerciseBox = trainingCart.showExerciseBox;
  	$scope.showResults = trainingCart.showResults;

  	$scope.currentWord = trainingCart.currentWord;

  	$scope.rightAnswer = trainingCart.rightAnswer;
  	$scope.wrongAnswer = trainingCart.wrongAnswer;

  	$scope.rightAnswerArr = trainingCart.rightAnswerArr;
  	$scope.wrongAnswerArr = trainingCart.wrongAnswerArr;

    /*$scope.$watch(function() {
  		return trainingCart.wrongAnswerArr();
  	},
  	function(newVal, old) {
  		$scope.wrongAnswerArr = newVal;
  	}, true);

    $scope.$watch(function() {
  		return trainingCart.rightAnswerArr();
  	},
  	function(newVal, old) {
  		$scope.rightAnswerArr = newVal;
  	}, true);*/

                  /*$scope.$watch(
                    "vm.fooCount",
                    function handleFooChange( newValue, oldValue ) {
                        console.log( "vm.fooCount:", newValue );
                    }
                );*/

	$interval(function() {
		console.log('from controller rightAnswerArr');
		console.log($scope.rightAnswerArr);
				console.log('from controller wrongAnswerArr');
		console.log($scope.wrongAnswerArr);
	}, 3000);

  }]);