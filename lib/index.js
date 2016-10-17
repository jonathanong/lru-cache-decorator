
const stringify = require('json-stable-stringify')
const crypto = require('crypto')
const LRU = require('lru-cache')

module.exports = options => {
  const lru = LRU(options)
  const { async } = options
  let { hash } = options
  if (typeof hash === 'string') {
    const ALGORITHM = hash
    hash = str => crypto.createHash(ALGORITHM).update(str).digest('base64')
  }

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
