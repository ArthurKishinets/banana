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
