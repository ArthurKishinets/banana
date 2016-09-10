"use strict";angular.module("bananaApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/dictionary",{templateUrl:"views/dictionary.html",controller:"DictCtrl"}).when("/materials",{templateUrl:"views/materials.html",controller:"MaterialsCtrl"}).when("/training",{templateUrl:"views/training.html",controller:"TrainingCtrl"}).when("/translateFrom",{templateUrl:"views/training/translatefrom.html",controller:"TranslatefromCtrl"}).when("/translateInto",{templateUrl:"views/training/translateInto.html",controller:"TranslateintoCtrl"}).when("/translatefromtest",{templateUrl:"views/training/translatefromtest.html",controller:"TranslatefromtestCtrl"}).when("/myroute",{templateUrl:"views/myroute.html",controller:"MyrouteCtrl"}).when("/trainingCart",{templateUrl:"views/trainingcart.html",controller:"TrainingcartCtrl"}).otherwise({redirectTo:"/"})}]).run(["$http",function(a){localStorage.words||a({method:"GET",url:"../../json/words.json"}).then(function(a){localStorage.words=JSON.stringify(a.data)},function(){console.log("no")}),localStorage.trainingOptions||a({method:"GET",url:"../../json/trainingOptions.json"}).then(function(a){localStorage.trainingOptions=JSON.stringify(a.data)},function(){console.log("no")})}]),angular.module("bananaApp").controller("MainCtrl",["$scope","$http",function(a,b){}]),angular.module("bananaApp").controller("DictCtrl",["$scope","$http","dictionary",function(a,b,c){a.modalWord={},a.isModalShown=!1;var d=0;a.words=JSON.parse(localStorage.words),a.toogleModal=function(b){a.isModalShown=!a.isModalShown,a.modalWord=b,console.log("event",b,"word",a.modalWord)},a.next=function(){d+1>=a.words.length&&(d=-1),a.modalWord=a.words[++d]},a.previous=function(){0===d&&(d=a.words.length),a.modalWord=a.words[--d]},a.chooseWord=c.chooseWord,a.addWords=c.addWords,a.checkAll=c.checkAll}]),angular.module("bananaApp").controller("MaterialsCtrl",["$scope","$http",function(a,b){a.b=2,a.materials=[],b({method:"GET",url:"../../json/materials.json"}).then(function(b){a.materials=b.data,console.log(a.materials)},function(){console.log("no")});var c="http://content.guardianapis.com/search?order-by=newest&q=literature%20books&show-blocks=all&api-key=test";$.ajax({url:c,method:"GET"}).done(function(a){console.log(a)}).fail(function(a){throw a})}]),angular.module("bananaApp").directive("myModal",function(){return{templateUrl:"views/modal.html",link:function(a,b,c){},scope:{word:"=info",next:"=next",previous:"=prev"}}}),angular.module("bananaApp").controller("TrainingCtrl",["$scope","wordsToTrain",function(a,b){console.log(b("translateFrom").wordsToTrain),b("translateFrom").wordsToTrain,b("translateFrom").disabled(),console.log(b("translateFrom").wordsToTrain),b("translateInto").wordsToTrain,b("translateInto").disabled()}]),angular.module("bananaApp").controller("TranslatefromCtrl",["$scope","wordsToTrain","translate",function(a,b,c){function d(){var b={},c=0;for(a.currentWord.translate;5!==a.options.length;){g=Math.floor(11*Math.random(0,1));var d=j[g].slice(0,j[g].indexOf("-"));d!==a.currentWord.value&&(b.hasOwnProperty(g)||(a.options[c++]=j[g].slice(j[g].indexOf("-")+1),b[g]=1))}g=Math.floor(5*Math.random(0,1)),a.options[g]=a.currentWord.translate}function e(){a.options=[]}function f(){localStorage.words=JSON.stringify(a.words)}console.log(c),a.words=JSON.parse(localStorage.words),a.wordsToTrain=[];var g=0,h=0,i=0,j=JSON.parse(localStorage.trainingOptions);!function(){for(var b=0;b<a.words.length;b++)a.words[b].translateFrom===!1&&a.wordsToTrain.push(a.words[b]);console.log(a.wordsToTrain)}(),a.currentWord=a.wordsToTrain[i],a.options=[],d(),a.checkAnswer=function(b){return h?(console.log("should nextWord"),a.nextWord(),!1):(h=1,void(b.delegateTarget.outerText==a.currentWord.translate?(a.currentWord.translateFrom=!0,$(event.target).addClass("green"),$(".dontKnow").text("next")):(a.currentWord.translateFrom=!1,$(event.target).addClass("red"),$(".answers span.ans"+g).addClass("green"),$(".dontKnow").text("next"))))},a.nextWord=function(){i+1<a.wordsToTrain.length?($(".answers .green").removeClass("green"),$(".answers .red").removeClass("red"),a.currentWord=a.wordsToTrain[++i],e(),d(),h=0,$(".dontKnow").text("I don`t know")):a.getResults()},a.rightAnswers=[],a.wrongAnswers=[],a.showResults=!1,a.showExerciseBox=!0,a.getResults=function(){a.showResults=!a.showResults,a.showExerciseBox=!a.showExerciseBox;for(var b=0;b<a.wordsToTrain.length;b++)a.wordsToTrain[b].translateFrom?a.rightAnswers.push(a.wordsToTrain[b]):a.wrongAnswers.push(a.wordsToTrain[b]);f()}}]),angular.module("bananaApp").controller("TranslateintoCtrl",["$scope","wordsToTrain",function(a,b){function c(){var b={},c=0;for(a.currentWord.value;5!==a.options.length;){f=Math.floor(11*Math.random(0,1));var d=i[f].slice(i[f].indexOf("-")+1);d!==a.currentWord.translate&&(b.hasOwnProperty(f)||(a.options[c++]=i[f].slice(0,i[f].indexOf("-")),b[f]=1))}f=Math.floor(5*Math.random(0,1)),a.options[f]=a.currentWord.value}function d(){a.options=[]}function e(){console.log(a.words),console.log(a.wordsToTrain),console.log(a.words===a.wordsToTrain),localStorage.words=JSON.stringify(a.words)}a.words=JSON.parse(localStorage.words),a.wordsToTrain=[];var f=0,g=0,h=0,i=JSON.parse(localStorage.trainingOptions);!function(){for(var b=0;b<a.words.length;b++)a.words[b].translateInto===!1&&a.wordsToTrain.push(a.words[b]);console.log(a.wordsToTrain)}(),a.currentWord=a.wordsToTrain[h],a.options=[],c(),a.checkAnswer=function(b){return g?(console.log("should nextWord"),a.nextWord(),!1):(g=1,void(b.delegateTarget.outerText==a.currentWord.value?(a.currentWord.translateInto=!0,$(event.target).addClass("green"),$(".dontKnow").text("next")):(a.currentWord.translateInto=!1,$(event.target).addClass("red"),$(".answers span.ans"+f).addClass("green"),$(".dontKnow").text("next"))))},a.nextWord=function(){h+1<a.wordsToTrain.length?($(".answers .green").removeClass("green"),$(".answers .red").removeClass("red"),a.currentWord=a.wordsToTrain[++h],d(),c(),g=0,$(".dontKnow").text("I don`t know")):a.getResults()},a.rightAnswers=[],a.wrongAnswers=[],a.showResults=!1,a.showExerciseBox=!0,a.getResults=function(){a.showResults=!a.showResults,a.showExerciseBox=!a.showExerciseBox;for(var b=0;b<a.wordsToTrain.length;b++)a.wordsToTrain[b].translateInto?a.rightAnswers.push(a.wordsToTrain[b]):a.wrongAnswers.push(a.wordsToTrain[b]);e()}}]),angular.module("bananaApp").directive("round",function(){return{template:'<span class="badge"> </span>',restrict:"E",link:function(a,b,c){a.word.translateFrom&&a.word.translateInto&&a.word.trainingCart?b.find("span").css({backgroundColor:"green"}):a.word.translateFrom||a.word.translateInto||a.word.trainingCart?b.find("span").css({backgroundColor:"yellow"}):b.find("span").css({backgroundColor:"red"})}}}),angular.module("bananaApp").factory("wordsToTrain",function(){return function(a){function b(){0===d.length?($("."+a).attr({disabled:!0,title:"not enough words"}),$("."+a).on("click",function(a){a.preventDefault()})):($("."+a).attr({disabled:!1,title:""}),$("."+a).on("click",function(a){}))}for(var c=JSON.parse(localStorage.words)||[],d=[],e=0;e<c.length;e++)c[e][a]===!1&&d.push(c[e]);return{wordsToTrain:d,length:d.length,disabled:b}}}),angular.module("bananaApp").factory("translate",function(){function a(){d.options=[]}function b(){localStorage.words=JSON.stringify(c)}this.training;var c=JSON.parse(localStorage.words);this.wordsToTrain=[];var d=this,e=0,f=0,g=0,h=JSON.parse(localStorage.trainingOptions),i=function(a){d.training=String(a);for(var b=0;b<c.length;b++)c[b][d.training]===!1&&d.wordsToTrain.push(c[b]);return console.log(d.wordsToTrain),d.wordsToTrain};this.options=[],this.currentWord;var j=function(){d.currentWord={},a(),d.currentWord=d.wordsToTrain[g];var b={},c=0;for(d.currentWord.value;5!==d.options.length;){if(e=Math.floor(11*Math.random(0,1)),"translateInto"==d.training)var f=h[e].slice(h[e].indexOf("-")+1);if("translateFrom"==d.training)var f=h[e].slice(0,h[e].indexOf("-"));("translateInto"!=d.training||f!==d.currentWord.translate)&&("translateFrom"!=d.training||f!==d.currentWord.value)&&(b.hasOwnProperty(e)||("translateInto"==d.training&&(d.options[c++]=h[e].slice(0,h[e].indexOf("-"))),"translateFrom"==d.training&&(d.options[c++]=h[e].slice(h[e].indexOf("-")+1)),b[e]=1))}return e=Math.floor(5*Math.random(0,1)),"translateFrom"==d.training&&(d.options[e]=d.currentWord.translate),"translateInto"==d.training&&(d.options[e]=d.currentWord.value),console.log(d.options),d.options},k=function(){console.log("interesting"),console.log(d.wordsToTrain[g]),console.log("eat shit"),console.log(d.currentWord)};this.showExerciseBox=!0,this.showResults=!1;var l=function(){var a=[],c=[];d.showExerciseBox=!d.showExerciseBox,d.showResults=!d.showResults;for(var e=0;e<d.wordsToTrain.length;e++)d.wordsToTrain[e][d.training]?a.push(d.wordsToTrain[e]):c.push(d.wordsToTrain[e]);b()},m=function(){g+1<d.wordsToTrain.length?($(".answers .green").removeClass("green"),$(".answers .red").removeClass("red"),d.currentWord=d.wordsToTrain[++g],a(),j(),f=0,$(".dontKnow").text("I don`t know")):l()},n=function(a){if(1===f)return m(),!1;f=1;var b;"translateInto"===b?b=d.currentWord.value:d.currentWord.translate,a.delegateTarget.outerText==b?(d.currentWord[d.training]=!0,$(event.target).addClass("green"),$(".dontKnow").text("next")):($(event.target).addClass("red"),$(".answers span.ans"+e).addClass("green"),$(".dontKnow").text("next"))};return{getWords:i,getOptions:j,checkAnswer:n,nextWord:m,getResults:l,test:k,showExerciseBox:this.showExerciseBox,options:this.options,currentWord:function(){return d.currentWord}}}),angular.module("bananaApp").controller("TranslatefromtestCtrl",["$scope","wordsToTrain","translate",function(a,b,c){c.getWords("translateFrom"),a.options=c.getOptions(),a.currentWord=c.currentWord(),a.showExerciseBox=c.showExerciseBox,a.showResults=c.showResults,a.checkAnswer=c.checkAnswer,a.nextWord=c.nextWord}]),angular.module("bananaApp").factory("dictionary",["$route",function(a){function b(){angular.forEach(c,function(a,b,c){for(var b=0;b<d.addedWords.length;b++)a.id===d.addedWords[b].id&&(a=d.addedWords[b])}),console.log(c),localStorage.words=JSON.stringify(c),a.reload()}this.addedWords=[];var c=JSON.parse(localStorage.words),d=this,e=function(a,b){$(a)[0].delegateTarget.checked?(d.addedWords.push(c[b]),console.log(d.addedWords)):$(a)[0].delegateTarget.checked||(b=d.addedWords.indexOf(c[b]),d.addedWords.splice(b,1),console.log(d.addedWords))},f=function(a){console.log(d.addedWords.length);for(var c=0;c<d.addedWords.length;c++)d.addedWords[c].translateInto=!1,d.addedWords[c].translateFrom=!1,d.addedWords[c].trainingCart=!1;var e=$("input:checked");angular.forEach(e,function(a){a.checked=!1}),b()},g=!1,h=function(a){g=!g,console.log(g);var b=$("input");console.log($(a)),g?(d.addedWords=c,angular.forEach(b,function(a){a.checked=!0})):g||(d.addedWords=[],angular.forEach(b,function(a){a.checked=!1}))};return{chooseWord:e,addWords:f,checkAll:h}}]),angular.module("bananaApp").controller("TrainingcartCtrl",["trainingCart","$scope","$interval",function(a,b,c){a.init(),a.nextPic(),b.showExerciseBox=a.showExerciseBox,b.showResults=a.showResults,b.currentWord=a.currentWord,b.rightAnswer=a.rightAnswer,b.wrongAnswer=a.wrongAnswer,b.rightAnswerArr=a.rightAnswerArr(),b.wrongAnswerArr=a.wrongAnswerArr()}]),angular.module("bananaApp").factory("trainingCart",["wordsToTrain","$interval",function(a,b){function c(){e=a("trainingCart").wordsToTrain,f=0,i=[],j=[],h=e[f],console.log("words"),console.log(i,j),k=!1,l=!0}function d(){for(var a=0;a<e.length;a++)for(var b=0;b<g.length;b++)e[a].id===g[b].id&&(g[b]=angular.copy(e[a]));localStorage.words=JSON.stringify(g)}var e=a("trainingCart").wordsToTrain,f=0,g=JSON.parse(localStorage.words),f=0,h=e[f],i=[],j=[],k=!1,l=!0,m=function(){$(".word").css({"background-image":"url(images/words/"+h.img+")"})},n=function(){f=0,k=!k,l=!l,console.log("rightAnswerArr"),console.log(i),console.log("wrongAnswerArr"),console.log(j),d()},o=function(){f+1<e.length?h=e[++f]:n()},p=function(){h.trainingCart=!0,i.push(h),o(),m()},q=function(){h.trainingCart=!1,j.push(h),o(),m()};return{nextPic:m,init:c,showExerciseBox:function(){return l},showResults:function(){return k},currentWord:function(){return h},rightAnswer:p,wrongAnswer:q,rightAnswerArr:function(){return i},wrongAnswerArr:function(){return j}}}]);