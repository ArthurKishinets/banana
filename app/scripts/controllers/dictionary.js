'use strict';

/**
 * @ngdoc function
 * @name bananaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bananaApp
 */
angular.module('bananaApp')
  .controller('DictCtrl', ['$scope', '$http', function ($scope, $http) {
  	$http({
  		method: 'GET',
  		url: '../../json/words.json'
  	}).then(function success(response) {
  		//alert('yes');
  		$scope.words = response.data;
  		console.log('yes');
  	},
  	function error() {
  		console.log('no');
  	});
  }]);
