import { describe, it } from 'mocha'
import { expect } from 'chai'
import { getRoleFromName } from '../src/creep/role/utils'

describe('creep/role', function () {
  describe('getRolefromName', function () {
    const getRoleName = getRoleFromName
    it('should be a function', function () {
      expect(getRoleName).to.be.a('function')
    })
    it('which accepts a string', function () {
      expect(() => getRoleName('string')).to.not.throw()
      expect(getRoleName).to.throw()
    })
    it('and return a string', function () {
      expect(getRoleName('test3898')).to.be.a('string')
    })
    it('which should be the extracted role', function () {
      expect(getRoleName('starter12345')).to.deep.equal('starter')
    })
  })
})
