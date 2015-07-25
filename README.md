# fix-perspective

> Computes and applies perspective correction given 4 corners

Based on the following sources:

* http://codepen.io/fta/pen/JoGybG?editors=111
* http://codepen.io/fta/full/JoGybG/
* http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/

[![NPM][fix-perspective-icon] ][fix-perspective-url]

[![Build status][fix-perspective-ci-image] ][fix-perspective-ci-url]
[![dependencies][fix-perspective-dependencies-image] ][fix-perspective-dependencies-url]
[![devdependencies][fix-perspective-devdependencies-image] ][fix-perspective-devdependencies-url]

[fix-perspective-icon]: https://nodei.co/npm/fix-perspective.png?downloads=true
[fix-perspective-url]: https://npmjs.org/package/fix-perspective
[fix-perspective-ci-image]: https://travis-ci.org/bahmutov/fix-perspective.png?branch=master
[fix-perspective-ci-url]: https://travis-ci.org/bahmutov/fix-perspective
[fix-perspective-dependencies-image]: https://david-dm.org/bahmutov/fix-perspective.png
[fix-perspective-dependencies-url]: https://david-dm.org/bahmutov/fix-perspective
[fix-perspective-devdependencies-image]: https://david-dm.org/bahmutov/fix-perspective/dev-status.png
[fix-perspective-devdependencies-url]: https://david-dm.org/bahmutov/fix-perspective#info=devDependencies

Given 4 starting points and 4 end points calculates transformation function (and matrix)
that transforms any starting point. Usually used to remove perspective distortion.

```js
// from, to are arrays with 4 points each (x, y)
var from = [{ 
    x: 100,
    y: 20
}, {
    x: 200,
    y: 50
}, ...];
var to = [{ 
    x: 20,
    y: 0
}, {
    x: 100,
    y: 0
}, ...];
var fixPerspective = require('fix-perspective');
var transformation = fixPerspective(from, to);
// any point in the original (FROM) coordinate system
var out = transformation(100, 60);
// out = { x: ..., y: ... };
// the transformation matrix (4x4) is available as transformation.H
```

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: [MIT](MIT-License.txt) - do anything with the code, but don't blame uTest if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open
[issue on Github](https://github.com/bahmutov/fix-perspective/issues)


