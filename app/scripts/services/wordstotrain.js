'use strict';

/**
 * @ngdoc service
 * @name bananaApp.wordsToTrain
 * @description
 * # wordsToTrain
 * Service in the bananaApp.
 */


 angular.module('bananaApp')
  .factory('wordsToTrain', function () {

  	return function(training) {  		

  		var words = JSON.parse(localStorage.words) || [];
  		var wordsToTrain = [];

  		// if we not out of words
		for( var i = 0; i < words.length; i++ ) {
			// and training is`t complete
			if ( words[i][training] === false ) {
				// add this word for training
				wordsToTrain.push(words[i]);

			}

		}

		//console.log($(training).selector);

		function disabled() {

			if ( wordsToTrain.length === 0 ) {

				$('.' + training).attr({'disabled': true, 'title': 'not enough words'});
				$('.' + training).on('click', function(event) {
					event.preventDefault();
				});

			}

			else {

				$('.' + training).attr({'disabled': false, 'title': ''});
				$('.' + training).on('click', function(event) {

					// might be wrong

				});

			}

		}

		return {

			wordsToTrain: wordsToTrain,

			length: wordsToTrain.length,

			disabled: disabled

		};

  	};

  });
