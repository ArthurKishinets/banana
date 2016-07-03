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