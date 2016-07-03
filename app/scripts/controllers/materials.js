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



