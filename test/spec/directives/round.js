'use strict';

describe('Directive: round', function () {

  // load the directive's module
  beforeEach(module('bananaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<round></round>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the round directive');
  }));
});
