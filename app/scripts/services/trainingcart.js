'use strict';

/**
 * @ngdoc service
 * @name bananaApp.trainingCart
 * @description
 * # trainingCart
 * Factory in the bananaApp.
 */
angular.module('bananaApp')
	.factory('trainingCart', ['wordsToTrain', '$interval', function(wordsToTrain, $interval) {
		// Service logic
		// ...

		var words = wordsToTrain('trainingCart').wordsToTrain,
			index = 0,
			allwords = JSON.parse(localStorage.words);
		var index = 0,
			currentWord = words[index];
		var rightAnswerArr = [],
			wrongAnswerArr = [],
			showResults = false,
			showExerciseBox = true;

		function init() {

			// get words to train
			words = wordsToTrain('trainingCart').wordsToTrain;
			index = 0, rightAnswerArr = [], wrongAnswerArr = [];
			currentWord = words[index];

			console.log('words');
			console.log(rightAnswerArr, wrongAnswerArr);

			showResults = false;
			showExerciseBox = true;

		};

		// get next pic
		var nextPic = function() {

			$('.word').css({
				'background-image': 'url(images/words/' + currentWord.img + ')'
			});

		};

		// save results to localStorage
		function save() {

			for (var i = 0; i < words.length; i++) {
				for (var j = 0; j < allwords.length; j++) {
					if (words[i].id === allwords[j].id) {
						allwords[j] = angular.copy(words[i]);
					}
				}
			}

			localStorage.words = JSON.stringify(allwords);
		}

		// hide training and show results
		var getResults = function() {
			index = 0;
			showResults = !showResults;
			showExerciseBox = !showExerciseBox;

			//console.log('words length result', words.length, wrongAnswerArr);
			/*for ( var i = 0; i < words.length; i++ ) {
				console.log(i);
				if (words[i].trainingCart) {
					rightAnswerArr.push(words[i]);
				}

				else if (!words[i].trainingCart) {
					wrongAnswerArr.push(words[i]);
				}

			}*/

			console.log('rightAnswerArr');
			console.log(rightAnswerArr);
			console.log('wrongAnswerArr');
			console.log(wrongAnswerArr);

			save();
		};

		// get next word
		var nextWord = function() {
			if ((index + 1) < words.length) {
				currentWord = words[++index];
			} else {
				getResults();
			}
		};

		// if we know the word
		var rightAnswer = function() {

			currentWord['trainingCart'] = true;
			rightAnswerArr.push(currentWord);
			nextWord();
			nextPic();
		};

		// if we doesn`t know the word
		var wrongAnswer = function() {

			currentWord['trainingCart'] = false;
			wrongAnswerArr.push(currentWord);
			nextWord();
			nextPic();
		};

		// Public API here
		return {
			nextPic: nextPic,
			init: init,
			showExerciseBox: function() {
				return showExerciseBox;
			},
			showResults: function() {
				return showResults;
			},
			currentWord: function() {
				return currentWord;
			},
			rightAnswer: rightAnswer,
			wrongAnswer: wrongAnswer,
			rightAnswerArr: function() {
				return rightAnswerArr;
			},
			wrongAnswerArr: function() {
				return wrongAnswerArr;
			}

		};

	}]);
