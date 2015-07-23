require('lazy-ass');
var check = require('check-more-types');
var calculate = require('./calculate-transform');

var applyTransform = function applyTransform(tr, x, y) {
  var applied = numeric.dot(tr, [x, y, 0, 1]);
  var w = applied[3];
  return {
    x: applied[0] / w,
    y: applied[1] / w
  };
};

function has4floats(arr) {
  return check.array(arr) &&
    arr.length === 4 &&
    arr.every(check.number);
}

function m4(t) {
  return check.array(t) &&
    t.length === 4 &&
    t.every(has4floats);
}

check.mixin(m4);

function identity(t) {
  return check.m4 &&
    t[0][0] === 1 &&
    t[1][1] === 1 &&
    t[2][2] === 1 &&
    t[3][3] === 1;
}

check.mixin(identity);

function numberEqual(a, b) {
  return Math.abs(a - b) < 1e-6;
}

check.mixin(numberEqual);

describe('calculate transform', function () {
  it('is a function', function () {
    la(check.fn(calculate));
  });

  it('calculates identity', function () {
    var corners = [{
      x: 0,
      y: 0,
    }, {
      x: 100,
      y: 0
    }, {
      x: 100,
      y: 50
    }, {
      x: 0,
      y: 50
    }];
    var tr = calculate(corners, corners);
    la(check.m4(tr), 'found transform matrix', tr);
    la(check.identity(tr), 'transform should be identity', tr);

    var apply = applyTransform.bind(null, tr);
    corners.forEach(function (corner) {
      var transformed = apply(corner.x, corner.y);
      la(check.numberEqual(transformed.x, corner.x));
      la(check.numberEqual(transformed.y, corner.y));
    });
  });

  it('calculates identity 2', function () {
    var corners = [{
      x: 0,
      y: 0,
    }, {
      x: 100,
      y: 40
    }, {
      x: 100,
      y: 50
    }, {
      x: 0,
      y: 50
    }];
    var tr = calculate(corners, corners);
    la(check.m4(tr), 'found transform matrix', tr);
    la(check.identity(tr), 'transform should be identity', tr);

    var apply = applyTransform.bind(null, tr);
    corners.forEach(function (corner) {
      var transformed = apply(corner.x, corner.y);
      la(check.numberEqual(transformed.x, corner.x));
      la(check.numberEqual(transformed.y, corner.y));
    });
  });
});
