'use strict';

describe('Controller: TrainingcartCtrl', function () {

  // load the controller's module
  beforeEach(module('bananaApp'));

  var TrainingcartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrainingcartCtrl = $controller('TrainingcartCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
