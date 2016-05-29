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
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  }).run(function($http) {

    window.words = [];

    $http({
      method: 'GET',
      url: '../../json/words.json'
    }).then(function success(response) {
      words = response.data;
    },
    function error() {
      console.log('no');
    });

    window.trainingOptions = [];

    $http({
      method: 'GET',
      url: '../../json/trainingOptions.json'
    }).then(function success(response) {
      trainingOptions = response.data;
    },
    function error() {
      console.log('no');
    });

  });
