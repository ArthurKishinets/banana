'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:TranslatefromCtrl
 * @description
 * # TranslatefromCtrl
 * Controller of the bananaApp
 */

angular.module('bananaApp')
  .controller('TranslatefromCtrl', function ($scope) {

  	$scope.words = JSON.parse(localStorage.words), $scope.wordsToTrain = []; 

  	var index = 0, beenClicked = 0, currentWord = 0, trainingOptions = JSON.parse(localStorage.trainingOptions);

  	(function getWords() {

	  	for(var i = 0; i < $scope.words.length; i++) {
	  		// if word doesn`t have this training completed we add it to training list
	  		if ( $scope.words[i].translateFrom === false ) {

	  			$scope.wordsToTrain.push($scope.words[i]);

	  		}
	  	}

	  	console.log($scope.wordsToTrain);

    }());

    $scope.currentWord = $scope.wordsToTrain[currentWord];
    $scope.options = [];

    // get unique options to choose 
    function getOptions() {
    	
    	var previous = {}, i = 0, rightOption = $scope.currentWord.translate;

    	while($scope.options.length !== 5) {

    		index = Math.floor(Math.random(0, 1)*11);

    		// make sure we aren`t adding the right answer to options (we will do it later)
    		var possibleOpt = trainingOptions[index].slice(0, trainingOptions[index].indexOf('-'));
    		
    		//console.log($scope.currentWord.value)

    		// if we do than skip the rest of loop
    		if (possibleOpt === $scope.currentWord.value)
    			continue;

    		// if we have`t added this option already
    		if ( !previous.hasOwnProperty(index) ) {

    			//before we add word to training we cut off the translate part of the string
    			$scope.options[i++] = trainingOptions[index].slice(trainingOptions[index].indexOf('-') + 1);
    			previous[index] = 1;

    		}
    		
    	}

    	// adding right answer to options

    	index = Math.floor(Math.random(0, 1)*5);
  
    	$scope.options[index] = $scope.currentWord.translate;



    };

    getOptions();

    // if we need to clear options

    function clearOptions() {

    	var previous = {};

    	$scope.options = [];

    };

    $scope.checkAnswer = function($event) {

    	// if one answer was choosen go to next word

    	if ( beenClicked ) {
    		console.log('should nextWord');
    		$scope.nextWord();
    		return false;
    	}

    	beenClicked = 1;

    	// if the right answer was choosen

    	if ( $event.delegateTarget.outerText == $scope.currentWord.translate ) {

    		$scope.currentWord.translateFrom = true;

	    	$(event.target).addClass('green');

	    	$('.dontKnow').text('next');/*.css({
	    		'color': 'green'
	    	});*/

    	}

    	// if the wrong answer was choosen 

    	else {

    		$(event.target).addClass('red');

    		$('.answers span.ans' + index).addClass(
    			'green'
    		);

	    	$('.dontKnow').text('next');/*.css({
	    		'color': 'green'
	    	});*/

    	}
    };


    $scope.nextWord = function() {

    	// if we not out of words

    	if( currentWord + 1 < $scope.wordsToTrain.length ) {

    		// clear previous answers

	    	$('.answers .green').removeClass("green");
	    	$('.answers .red').removeClass("red");

	    	// get new word and answers

	    	$scope.currentWord = $scope.wordsToTrain[++currentWord];

	    	clearOptions();

	    	getOptions();

	    	beenClicked = 0;

	    	$('.dontKnow').text('I don`t know')

    	}

    	else {

    		$scope.getResults();

    	}

    };

    $scope.rightAnswers = [], $scope.wrongAnswers = [], $scope.showResults = false;
    $scope.showExerciseBox = true;

    $scope.getResults = function() {

    	// hide training and show results

    	$scope.showResults = !$scope.showResults;
    	$scope.showExerciseBox = !$scope.showExerciseBox;

    	// fill wrong and right arrays

    	for ( var i = 0; i < $scope.wordsToTrain.length; i++ ) {

    		if ( $scope.wordsToTrain[i].translateFrom ) {
    			$scope.rightAnswers.push($scope.wordsToTrain[i]);
    		}

    		else {
    			$scope.wrongAnswers.push($scope.wordsToTrain[i]);
    		}

    	}

    	// save progress

    	save();

    };

    function save() {

    	localStorage.words = JSON.stringify($scope.words);

    };
    
  });