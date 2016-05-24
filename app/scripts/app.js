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
      .otherwise({
        redirectTo: '/'
      });
  });
