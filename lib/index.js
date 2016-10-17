const stringify = require('json-stable-stringify');
const crypto = require('crypto');

module.exports = options => {
  const lru = LRU(options)
  const { async, hash } = options

  return fn => {
    return (...args) => {
      let key = stringify(args)
      if (typeof hash === 'function') key = hash(key)
      if (lru.has(key)) return lru.get(key)

      if (async) {
        const value = new Promise(resolve => resolve(fn(...args)))
        lru.set(key, value)
        return value
      }

      // NOTE: may throw
      const value = fn(...args)
      lru.set(key, value)
      return value
    }
  }
}
