'use strict';

/**
 * @ngdoc overview
 * @name bananaApp
 * @description
 * # bananaApp
 *
 * Main module of the application.
 */
angular
	.module('bananaApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(["$routeProvider", function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/dictionary', {
				templateUrl: 'views/dictionary.html',
				controller: 'DictCtrl'
			})
			.when('/materials', {
				templateUrl: 'views/materials.html',
				controller: 'MaterialsCtrl'
			})
			.when('/training', {
				templateUrl: 'views/training.html',
				controller: 'TrainingCtrl'
			})
			.when('/translateFrom', {
				templateUrl: 'views/training/translatefrom.html',
				controller: 'TranslatefromCtrl'
			})
			.when('/translateInto', {
				templateUrl: 'views/training/translateInto.html',
				controller: 'TranslateintoCtrl'
			})
			.when('/translatefromtest', {
				templateUrl: 'views/training/translatefromtest.html',
				controller: 'TranslatefromtestCtrl'
			})
			.when('/myroute', {
				templateUrl: 'views/myroute.html',
				controller: 'MyrouteCtrl'
			})
			.when('/trainingCart', {
				templateUrl: 'views/trainingcart.html',
				controller: 'TrainingcartCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]).run(["$http", function($http) {

		if (!localStorage.words) {
			$http({
				method: 'GET',
				url: '../../json/words.json'
			}).then(function success(response) {
					localStorage.words = JSON.stringify(response.data);
				},
				function error() {
					console.log('no');
				}
			);
		}

		if (!localStorage.trainingOptions) {
			$http({
				method: 'GET',
				url: '../../json/trainingOptions.json'
			}).then(function success(response) {
					localStorage.trainingOptions = JSON.stringify(response.data);
				},
				function error() {
					console.log('no');
				}
			);
		}



	}]);

'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  	
  }]);

'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('DictCtrl', ['$scope', '$http', 'dictionary', function ($scope, $http, dictionary) {
    $scope.modalWord = {}, $scope.isModalShown = false;
    var wordIndex = 0;

    $scope.words = JSON.parse(localStorage.words);

    $scope.toogleModal = function($event) {

      $scope.isModalShown = !$scope.isModalShown;
      $scope.modalWord = $event;
      console.log('event', $event, 'word', $scope.modalWord);

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

    };

    $scope.chooseWord = dictionary.chooseWord;

    $scope.addWords = dictionary.addWords;

    $scope.checkAll = dictionary.checkAll;

  }]);

'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:MaterialsCtrl
 * @description
 * # MaterialsCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('MaterialsCtrl', ['$scope', '$http', function ($scope, $http) {

  	$scope.b = 2, $scope.materials = [];
  	$http({
  		method: 'GET',
  		url: '../../json/materials.json'
  	}).then(function success(response) {
  		//alert('yes');
  		$scope.materials = response.data;
  		console.log($scope.materials);
  	},
  	function error() {
  		console.log('no');
  	});

var url = 'http://content.guardianapis.com/search?order-by=newest&q=literature%20books&show-blocks=all&api-key=test';

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});

  }]);




'use strict';

/**
 * @ngdoc directive
 * @name bananaApp.directive:myModal
 * @description
 * # myModal
 */
angular.module('bananaApp')
  .directive('myModal', function () {
    return {
      templateUrl: 'views/modal.html',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the myModal directive');
        //console.log(scope.word.value);
      },
      scope: {
      	word: '=info',
      	next: '=next',
      	previous: '=prev'
      }

    };
  });

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

'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:TranslatefromCtrl
 * @description
 * # TranslatefromCtrl
 * Controller of the bananaApp
 */

angular.module('bananaApp')
  .controller('TranslatefromCtrl', [ '$scope', 'wordsToTrain', 'translate', function ($scope, wordsToTrain, translate) {

    console.log(translate);

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

            $scope.currentWord.translateFrom = false;

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
    
  }]);
'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:TranslateintoCtrl
 * @description
 * # TranslateintoCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('TranslateintoCtrl', [ '$scope', 'wordsToTrain', function ($scope, wordsToTrain) {
    
  	$scope.words = JSON.parse(localStorage.words), $scope.wordsToTrain = []; 

  	var index = 0, beenClicked = 0, currentWord = 0, trainingOptions = JSON.parse(localStorage.trainingOptions);

  	(function getWords() {

	  	for(var i = 0; i < $scope.words.length; i++) {
	  		// if word doesn`t have this training completed we add it to training list
	  		if ( $scope.words[i].translateInto === false ) {

	  			$scope.wordsToTrain.push($scope.words[i]);

	  		}
	  	}

	  	console.log($scope.wordsToTrain);

	  	/*if( $scope.wordsToTrain.length === 0 ) {
  			return false;
  		}*/

    }());

    $scope.currentWord = $scope.wordsToTrain[currentWord];
    $scope.options = [];

    // get unique options to choose 
    function getOptions() {
    	
    	var previous = {}, i = 0, rightOption = $scope.currentWord.value;

    	while($scope.options.length !== 5) {

    		index = Math.floor(Math.random(0, 1)*11);

    		// make sure we aren`t adding the right answer to options (we will do it later)
    		var possibleOpt = trainingOptions[index].slice(trainingOptions[index].indexOf('-') + 1);
    		
    		//console.log($scope.currentWord.value)

    		// if we do than skip the rest of loop
    		if (possibleOpt === $scope.currentWord.translate)
    			continue;

    		// if we have`t added this option already
    		if ( !previous.hasOwnProperty(index) ) {

    			//before we add word to training we cut off the translate part of the string
    			$scope.options[i++] = trainingOptions[index].slice(0, trainingOptions[index].indexOf('-'));
    			previous[index] = 1;

    		}
    		
    	}

    	// adding right answer to options

    	index = Math.floor(Math.random(0, 1)*5);
  
    	$scope.options[index] = $scope.currentWord.value;



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

    	if ( $event.delegateTarget.outerText == $scope.currentWord.value ) {

    		$scope.currentWord.translateInto = true;

	    	$(event.target).addClass('green');

	    	$('.dontKnow').text('next');/*.css({
	    		'color': 'green'
	    	});*/

    	}

    	// if the wrong answer was choosen 

    	else {

            $scope.currentWord.translateInto = false;

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

    		if ( $scope.wordsToTrain[i].translateInto ) {
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

    	console.log($scope.words);

    	console.log($scope.wordsToTrain);

    	console.log($scope.words === $scope.wordsToTrain);

    	localStorage.words = JSON.stringify($scope.words);

    };
	//console.log($scope.rightAnswers.length);

  }]);

'use strict';

/**
 * @ngdoc directive
 * @name bananaApp.directive:round
 * @description
 * # round
 */
angular.module('bananaApp')
  .directive('round', function () {
    return {
      template: '<span class="badge"> </span>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        if ( scope.word.translateFrom && scope.word.translateInto && scope.word.trainingCart) {
        	element.find('span').css({
        		"backgroundColor": "green"
        	});
        }
        else if ( scope.word.translateFrom || scope.word.translateInto || scope.word.trainingCart) {
        	element.find('span').css({
        		"backgroundColor": "yellow"
        	});
        }
        else {
        	element.find('span').css({
        		"backgroundColor": "red"
        	});
        }
      }
    };
  });

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

'use strict';

/**
 * @ngdoc service
 * @name bananaApp.translate
 * @description
 * # translate
 * Factory in the bananaApp.
 */
angular.module('bananaApp')
  .factory('translate', function () {
    // Service logic
    // ...

    this.training;

    var words = JSON.parse(localStorage.words); this.wordsToTrain = [];

    var that = this;

    var index = 0, beenClicked = 0, currentWordIndex = 0, trainingOptions = JSON.parse(localStorage.trainingOptions);

    var getWords = function(training) {

      that.training = String(training);

      for(var i = 0; i < words.length; i++) {
        // if word doesn`t have this training completed we add it to training list
        if ( words[i][that.training] === false ) {

          that.wordsToTrain.push(words[i]);

        }
      }
      console.log(that.wordsToTrain);
      return that.wordsToTrain;

    };

    this.options = [];
    this.currentWord;

    // get unique options to choose 
    var getOptions = function() {
      
      that.currentWord = {};
      clearOptions();
      //console.log(that);
      //training ? training = training : training = 'translateFrom';
      //training = String(training);

      that.currentWord = that.wordsToTrain[currentWordIndex];

      //console.log( that.currentWord );
      //var options = [];
      //console.log(that.currentWord);
      var previous = {}, i = 0, rightOption = that.currentWord.value;
      //console.log(that.currentWord.value);
      while( that.options.length !== 5 ) {

        index = Math.floor(Math.random(0, 1)*11);
        //console.log(index);

        // make sure we aren`t adding the right answer to options (we will do it later)

        if( that.training == 'translateInto') {
          //console.log('its translateInto');
          var possibleOpt = trainingOptions[index].slice(trainingOptions[index].indexOf('-') + 1);
        }

        if (that.training == 'translateFrom') {
          var possibleOpt = trainingOptions[index].slice(0, trainingOptions[index].indexOf('-'));
          //console.log('posssinbler optiiioiiiiiiiiiiiiiiiiiiiiing');
          //console.log(possibleOpt);
        }
        //console.log($scope.currentWord.value)

        // if we do than skip the rest of loop

        if( that.training == 'translateInto' && possibleOpt === that.currentWord.translate) {
          //console.log('translateInto');
          //console.log();
          continue;
        }

        if( that.training == 'translateFrom' && possibleOpt === that.currentWord.value) {
          //console.log('translateFrom &&&&&&&&&&&&&');
          //console.log('fuck up');
          continue;
        }

        // if we have`t added this option already
        if ( !previous.hasOwnProperty(index) ) {

          //before we add word to training we cut off the translate part of the string
          if( that.training == 'translateInto' ) {

            that.options[i++] = trainingOptions[index].slice(0, trainingOptions[index].indexOf('-'));
                        //console.log(that.options);
          }

          if( that.training == 'translateFrom' ) {
            that.options[i++] = trainingOptions[index].slice(trainingOptions[index].indexOf('-') + 1);
                                    //console.log(that.options);
          }
          
          //mark that word index as used
          previous[index] = 1;
          //console.log(options.length);
        }

      }
      //console.log(that.options.length);
      // adding right answer to options

      index = Math.floor(Math.random(0, 1)*5);

      if ( that.training == 'translateFrom' ) {
        that.options[index] = that.currentWord.translate;  
      }

      if ( that.training == 'translateInto' ) {
        that.options[index] = that.currentWord.value;  
      }

      console.log(that.options);

      return that.options;

    };

    var test = function() {
      console.log('interesting');
      //console.log(that.currentWord);
      console.log(that.wordsToTrain[currentWordIndex]);
      console.log('eat shit');
      console.log(that.currentWord);
    };

    // if we need to clear options

    function clearOptions() {

      var previous = {};

      that.options = [];

    };

    this.showExerciseBox = true;
    this.showResults = false;

    function save() {

      localStorage.words = JSON.stringify(words);

    };

    var getResults = function() {

      var rightAnswers = [], wrongAnswers = [];

      // hide training and show results

      that.showExerciseBox = !that.showExerciseBox;
      that.showResults = !that.showResults;

      // fill wrong and right arrays

      for ( var i = 0; i < that.wordsToTrain.length; i++ ) {

        if ( that.wordsToTrain[i][that.training] ) {
          rightAnswers.push(that.wordsToTrain[i]);
        }

        else {
          wrongAnswers.push(that.wordsToTrain[i]);
        }

      }

      // save progress

      save();

    };

    var nextWord = function() {

      // if we not out of words

      if( currentWordIndex + 1 < that.wordsToTrain.length ) {

        // clear previous answers

        $('.answers .green').removeClass("green");
        $('.answers .red').removeClass("red");

        // get new word and answers

        that.currentWord = that.wordsToTrain[++currentWordIndex];

        clearOptions();

        //console.log('its ok for now');

                //alert('its ok for now');
        getOptions();

//alert('its not ok');

        beenClicked = 0;

        

        $('.dontKnow').text('I don`t know')

      }

      else {

        getResults();

      }

    };

    var checkAnswer = function($event) {
      //console.log('fire');
      // if one answer was choosen go to next word
      
      if ( beenClicked === 1 ) {
        //console.log('nextWord');
        nextWord();
        return false;
      }


      beenClicked = 1;

      // if the right answer was choosen

      // decide with which value we should compare translate or english

      var compare;

      compare === 'translateInto' ? compare = that.currentWord.value : that.currentWord.translate;

      if ( $event.delegateTarget.outerText == compare ) {

        that.currentWord[that.training] = true;

        $(event.target).addClass('green');

        $('.dontKnow').text('next');

      }

      // if the wrong answer was choosen 

      else {

        $(event.target).addClass('red');

        $('.answers span.ans' + index).addClass(
          'green'
        );

        $('.dontKnow').text('next');

      }
    };

    // Public API here
    return {

      getWords: getWords,

      getOptions: getOptions,

      checkAnswer: checkAnswer,

      nextWord: nextWord,

      getResults: getResults,

      test: test,

      showExerciseBox: this.showExerciseBox,

      options: this.options,

      currentWord: function() {
        return that.currentWord;
      }

    };
    
  });
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

'use strict';

/**
 * @ngdoc service
 * @name bananaApp.dictionary
 * @description
 * # dictionary
 * Factory in the bananaApp.
 */
angular.module('bananaApp')
  .factory('dictionary', [ '$route', function ($route) {
    // Service logic
    // ...

    this.addedWords = [];
    // get all words
    var words = JSON.parse(localStorage.words);
    var that = this, index;

    // when input clicked

    var chooseWord = function(event, index) {
      //console.log($(event)[0].delegateTarget.checked);
      //console.log($(event)[0]);
      // if we checked add this word
      if( $(event)[0].delegateTarget.checked ) {
        that.addedWords.push(words[index]);
        console.log(that.addedWords);

      }
      // if we unchecked remove this word
      else if ( !$(event)[0].delegateTarget.checked ) {
        
        index = that.addedWords.indexOf(words[index]);
        that.addedWords.splice(index, 1);
        console.log(that.addedWords);

      }
    };



    var addWords = function($scope) {

      console.log(that.addedWords.length);

      for(var i = 0; i < that.addedWords.length; i++) {
        /*that.addedWords[i][translateFrom] = false;
        that.addedWords[i][translateInto] = false;*/
        that.addedWords[i]['translateInto'] = false;
        that.addedWords[i]['translateFrom'] = false;
        that.addedWords[i]['trainingCart'] = false;
        //console.log(that.addedWords[i]);

      }

      var inputs = $('input:checked');

      angular.forEach(inputs, function(item) {
        item.checked = false;
      });

      save();

    };

    // save changed condition
    function save() {
      // if in our words we find it`s change copy then replace that word by it`s newer copy
      angular.forEach(words, function(item, i ,words) {
        for(var i = 0; i < that.addedWords.length; i++) {
          if( item.id === that.addedWords[i].id ){
            item = that.addedWords[i];

          }
        }

      });

      console.log(words);
      localStorage.words = JSON.stringify(words);

      $route.reload();

    };

    var mainChecked = false;

    // check all the words in dictionary

    var checkAll = function(event) {

      mainChecked = !mainChecked;
      console.log(mainChecked);

      var inputs = $('input');
      console.log($(event));

      // if it was unchecked
      if( mainChecked ) {

        // add to all the words
        that.addedWords = words;
        angular.forEach(inputs, function(item) {
          //check all the inputs
          item.checked = true;
        });
      }

      // if it was checked
      else if ( !mainChecked ) {

        // clear all the words
        that.addedWords = [];
        angular.forEach(inputs, function(item) {
          // uncheck all the inputs
          item.checked = false;
        });
      }
    };
    


    // Public API here
    return {
      chooseWord: chooseWord,
      addWords: addWords,
      checkAll: checkAll
    };
  }]);

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
