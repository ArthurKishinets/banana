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
  }]);
