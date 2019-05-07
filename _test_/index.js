import Api from '../src/http/test'

describe('Http文件测试', () => {
  const apis = new Api()
  it('http～2', () => {
    assert.equal(4, apis.calcArea(2, 2))
  })
})
