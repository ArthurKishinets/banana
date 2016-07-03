'use strict';

describe('Service: trainingCart', function () {

  // load the service's module
  beforeEach(module('bananaApp'));

  // instantiate service
  var trainingCart;
  beforeEach(inject(function (_trainingCart_) {
    trainingCart = _trainingCart_;
  }));

  it('should do something', function () {
    expect(!!trainingCart).toBe(true);
  });

});
