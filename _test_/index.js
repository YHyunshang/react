import api from '../src/http/http'

describe('http', () => {
  it('http', () => {
    assert.equal(4, api.calcArea(2, 2))
  })
})
