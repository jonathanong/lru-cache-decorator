
# LRU Cache Decorator

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/jonathanong/lru-cache-decorator.svg)](https://greenkeeper.io/)
[![Downloads][downloads-image]][downloads-url]

A decorator that caches functions.

- Supports both sync and async functions.
- Supports hashing the function arguments - only necessary if you have really long/large function arguments.

## API

```js
const decorate = require('lru-cache-decorator')
```

### fn = decorate(options)(fn)

Options are passed to [`lru-cache`](https://github.com/isaacs/node-lru-cache).

Other options:

- `async = false` - whether the function is async (i.e. uses promises)
  - Caches functions as sync by default, but async functions would still work
  - Sync functions do not cache errors while async functions do since it's stored as a rejected promise
- `hash = Algorithm<String>|<Function>` - a function to hash the stringified function arguments. You can also supply a hashing function algorithm such as `sha256`
- `cacheErrors = true` - when `false` and `async=true`, errors are not cached.

[npm-image]: https://img.shields.io/npm/v/lru-cache-decorator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lru-cache-decorator
[travis-image]: https://img.shields.io/travis/jonathanong/lru-cache-decorator/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/jonathanong/lru-cache-decorator
[codecov-image]: https://img.shields.io/codecov/c/github/jonathanong/lru-cache-decorator/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/jonathanong/lru-cache-decorator
[david-image]: http://img.shields.io/david/jonathanong/lru-cache-decorator.svg?style=flat-square
[david-url]: https://david-dm.org/jonathanong/lru-cache-decorator
[license-image]: http://img.shields.io/npm/l/lru-cache-decorator.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/lru-cache-decorator.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/lru-cache-decorator
