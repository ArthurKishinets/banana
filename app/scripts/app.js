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
	.config(function($routeProvider) {
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
				templateUrl: 'views/training/translateinto.html',
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
	}).run(function($http) {

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



	});
