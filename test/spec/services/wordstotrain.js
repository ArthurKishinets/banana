'use strict';

describe('Service: wordsToTrain', function () {

  // load the service's module
  beforeEach(module('bananaApp'));

  // instantiate service
  var wordsToTrain;
  beforeEach(inject(function (_wordsToTrain_) {
    wordsToTrain = _wordsToTrain_;
  }));

  it('should do something', function () {
    expect(!!wordsToTrain).toBe(true);
  });

});
