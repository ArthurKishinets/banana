'use strict';

describe('Controller: MaterialsCtrl', function () {

  // load the controller's module
  beforeEach(module('bananaApp'));

  var MaterialsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaterialsCtrl = $controller('MaterialsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
