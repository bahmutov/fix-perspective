require('lazy-ass');
var check = require('check-more-types');
var calculate = require('./calculate-transform');

describe('calculate transform', function () {
  it('is a function', function () {
    la(check.fn(calculate));
  });
});
