require('lazy-ass');
var check = require('check-more-types');
var calculate = require('./calculate-transform');

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
    var transform = calculate(corners, corners);
    la(check.fn(transform), 'expected transform function');
    var tr = transform.H;
    la(check.m4(tr), 'found transform matrix', tr);
    la(check.identity(tr), 'transform should be identity', tr);

    corners.forEach(function (corner) {
      var transformed = transform(corner.x, corner.y);
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
    var transform = calculate(corners, corners);
    la(check.fn(transform), 'found transform fn', transform);

    corners.forEach(function (corner) {
      var transformed = transform(corner.x, corner.y);
      la(check.numberEqual(transformed.x, corner.x));
      la(check.numberEqual(transformed.y, corner.y));
    });
  });

  it('calculates scale', function () {
    var from = [{
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

    var to = [{
      x: 0,
      y: 0,
    }, {
      x: 200,
      y: 0
    }, {
      x: 200,
      y: 50
    }, {
      x: 0,
      y: 50
    }];

    var transform = calculate(from, to);
    la(check.fn(transform), 'found transform fn', transform);

    from.forEach(function (corner, k) {
      var transformed = transform(corner.x, corner.y);
      var toCorner = to[k];
      la(check.numberEqual(transformed.x, toCorner.x));
      la(check.numberEqual(transformed.y, toCorner.y));
    });
  });

  it('calculates test image', function () {
    // test poster used in README
    // https://github.com/bahmutov/fix-perspective-element
    var from = [{
      x: 470,
      y: 175,
    }, {
      x: 555,
      y: 130
    }, {
      x: 560,
      y: 345
    }, {
      x: 473,
      y: 345
    }];

    var to = [{
      x: 0,
      y: 0,
    }, {
      x: 100,
      y: 0
    }, {
      x: 100,
      y: 200
    }, {
      x: 0,
      y: 200
    }];

    var topLeft = from[0];
    var fromTopLeft = from.map(function (p) {
      return {
        x: p.x - topLeft.x,
        y: p.y - topLeft.y,
      };
    });

    var transform = calculate(fromTopLeft, to);
    la(check.fn(transform), 'found transform fn', transform);
    console.log(transform.H);

    from.forEach(function (corner, k) {
      var toTopLeft = {
        x: corner.x - topLeft.x,
        y: corner.y - topLeft.y
      };
      var transformed = transform(toTopLeft.x, toTopLeft.y);
      var toCorner = to[k];
      la(check.numberEqual(transformed.x, toCorner.x));
      la(check.numberEqual(transformed.y, toCorner.y));
    });

  });
});
