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

  	$scope.words = window.words, $scope.wordsToTrain = []; 
  	var index = 0, beenClicked = false;
  	(function getWords() {
	  	for(var i = 0; i < $scope.words.length; i++) {
	  		// if word doesn`t have this training completed we add it to training list
	  		if ( $scope.words[i].translateFrom === false ) {
	  			$scope.wordsToTrain.push($scope.words[i]);

	  		}
	  	}
    }());

    $scope.currentWord = $scope.wordsToTrain[0];
    $scope.options = [];

    // get unique options to choose 
    function getOptions() {
    	
    	var previous = {}, i = 0, rightOption = $scope.currentWord.translate;

    	while($scope.options.length !== 5) {

    		index = Math.floor(Math.random(0, 1)*11);

    		// make sure we aren`t adding the right answer to options (we will do it later)
    		var possibleOpt = window.trainingOptions[index].slice(0, trainingOptions[index].indexOf('-'));
    		
    		//console.log($scope.currentWord.value)

    		// if we do than skip the rest of loop
    		if (possibleOpt === $scope.currentWord.value)
    			continue;

    		// if we have`t added this option already
    		if ( !previous.hasOwnProperty(index) ) {

    			//before we add word to training we cut off the translate part of the string
    			$scope.options[i++] = window.trainingOptions[index].slice(trainingOptions[index].indexOf('-') + 1);
    			previous[index] = 1;

    		}
    		
    	}

    	// to be sure that we have right answer in randomed options

    	index = Math.floor(Math.random(0, 1)*5);
  
    	$scope.options[index] = $scope.currentWord.translate;
 

    };

    getOptions();

    $scope.checkAnswer = function($event) {

    	// if one answer was choosen do nothing

    	if (beenClicked)
    		return false;

    	beenClicked = true;

    	console.log($event.delegateTarget.outerText);

    	// if the right answer was choosen

    	if ( $event.delegateTarget.outerText == $scope.currentWord.translate ) {

	    	$(event.target).addClass('green');

	    	$('.dontKnow').text('next').css({
	    		'color': 'green'
	    	});

    	}

    	// if the wrong answer was choosen

    	else {

    		$(event.target).addClass('red');

    		$('.answers span.ans' + index).addClass(
    			'green'
    		);

	    	$('.dontKnow').text('next').css({
	    		'color': 'green'
	    	});

    	}
    };


    

  });