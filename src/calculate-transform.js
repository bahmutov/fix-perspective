var numeric = require('numeric');

if (typeof numeric !== 'object') {
  throw new Error('missing numeric library');
}

function applyTransform(tr, x, y) {
  var applied = numeric.dot(tr, [x, y, 0, 1]);
  var w = applied[3];
  return {
    x: applied[0] / w,
    y: applied[1] / w
  };
};

function calculateTransform(from, to) {
  var A, H, b, h, i, k_i, lhs, rhs, _i, _j, _k, _ref;
  console.assert((from.length === (_ref = to.length) && _ref === 4));
  A = [];
  for (i = _i = 0; _i < 4; i = ++_i) {
    A.push([
      from[i].x,
      from[i].y,
      1,
      0,
      0,
      0,
      -from[i].x * to[i].x,
      -from[i].y * to[i].x
    ]);
    A.push([
      0,
      0,
      0,
      from[i].x,
      from[i].y,
      1,
      -from[i].x * to[i].y,
      -from[i].y * to[i].y
    ]);
  }
  b = [];
  for (i = _j = 0; _j < 4; i = ++_j) {
    b.push(to[i].x);
    b.push(to[i].y);
  }
  console.log('A', A);
  console.log('b', b);
  h = numeric.solve(A, b);
  H = [[
        h[0],
        h[1],
        0,
        h[2]
      ], [
        h[3],
        h[4],
        0,
        h[5]
      ], [
        0,
        0,
        1,
        0
      ], [
        h[6],
        h[7],
        0,
        1
      ]];
  // sanity check
  // TODO remove
  for (i = _k = 0; _k < 4; i = ++_k) {
    lhs = numeric.dot(H, [from[i].x, from[i].y, 0, 1]);
    k_i = lhs[3];
    rhs = numeric.dot(k_i, [to[i].x, to[i].y, 0, 1]);
    console.assert(numeric.norm2(numeric.sub(lhs, rhs)) < 1e-9, "Not equal:", lhs, rhs);
  }
  return H;
}

function calculateTransformation(from, to) {
  // TODO validate inputs
  var H = calculateTransform(from, to);
  var transformation = applyTransform.bind(null, H);
  transformation.H = H;
  return transformation;
}

module.exports = calculateTransformation;
