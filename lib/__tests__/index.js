
/* eslint-env jest */

const assert = require('assert')

const decorator = require('..')

describe('LRU Cache Decorator', () => {
  describe('when .async=false', () => {
    it('should work cache', () => {
      const VALUE = Math.random()
      let calls = 0

      const fn = decorator({
        maxAge: 100000000
      })(() => VALUE + (calls++))
      assert.equal(fn(), VALUE)
      assert.equal(fn(), VALUE)
      assert.equal(fn(), VALUE)
    })

    it('should throw when the function throws', () => {
      const fn = decorator({
        maxAge: 100000000
      })(() => {
        throw new Error('boom')
      })

      assert.throws(() => fn())
      assert.throws(() => fn())
      assert.throws(() => fn())
    })
  })

  describe('when .async=true', () => {
    it('should cache the results', () => {
      const VALUE = Math.random()
      let calls = 0

      const fn = decorator({
        maxAge: 100000000,
        async: true
      })(() => VALUE + (calls++))

      return fn().then(result => {
        assert.equal(VALUE, result)
        return fn()
      }).then(result => {
        assert.equal(VALUE, result)
      })
    })

    it('should cache errors', () => {
      const fn = decorator({
        maxAge: 100000000,
        async: true
      })(() => {
        throw new Error('boom')
      })

      return fn().then(() => {
        throw new Error('bam')
      }).catch(err => {
        assert.equal(err.message, 'boom')
        return fn()
      }).then(() => {
        throw new Error('bam')
      }).catch(err => {
        assert.equal(err.message, 'boom')
      })
    })
  })

  describe('when .hash=ALGORITHM', () => {
    describe('when .async=false', () => {
      it('should work cache', () => {
        const VALUE = Math.random()
        let calls = 0

        const fn = decorator({
          hash: 'sha256',
          maxAge: 100000000
        })(() => VALUE + (calls++))
        assert.equal(fn(), VALUE)
        assert.equal(fn(), VALUE)
        assert.equal(fn(), VALUE)
      })

      it('should throw when the function throws', () => {
        const fn = decorator({
          hash: 'sha256',
          maxAge: 100000000
        })(() => {
          throw new Error('boom')
        })

        assert.throws(() => fn())
        assert.throws(() => fn())
        assert.throws(() => fn())
      })
    })
  })

  describe('when .hash=<Function>', () => {
    const hash = str => str + 'lkjasdf'

    describe('when .async=false', () => {
      it('should work cache', () => {
        const VALUE = Math.random()
        let calls = 0

        const fn = decorator({
          hash,
          maxAge: 100000000
        })(() => VALUE + (calls++))
        assert.equal(fn(), VALUE)
        assert.equal(fn(), VALUE)
        assert.equal(fn(), VALUE)
      })

      it('should throw when the function throws', () => {
        const fn = decorator({
          hash,
          maxAge: 100000000
        })(() => {
          throw new Error('boom')
        })

        assert.throws(() => fn())
        assert.throws(() => fn())
        assert.throws(() => fn())
      })
    })
  })

  describe('when .maxAge=0', () => {
    it('should not cache the results', () => {
      const VALUE = Math.random()
      let calls = 0

      const fn = decorator({
        maxAge: 1
      })(() => VALUE + (calls++))

      return new Promise(resolve => {
        setTimeout(() => {
          assert.equal(fn(), VALUE)

          setTimeout(() => {
            assert.equal(fn(), VALUE + 1)

            setTimeout(() => {
              assert.equal(fn(), VALUE + 2)
              resolve()
            }, 5)
          }, 5)
        }, 5)
      })
    })
  })
})
