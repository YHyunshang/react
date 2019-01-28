const Env = {
  dev: { // 开发
    '/api': {
      target: 'http://10.67.54.88:3000',
      secure: false,
      changeOrigin: true
    }
  },
  build: { // 生产
    '/vender': {
      target: 'http://glzx.yonghui.cn:9000',
      secure: false,
      changeOrigin: true
    }
  }
}

module.exports = (function() {
  if (process.env.NODE_ENV === 'production') {
    return Env.build
  }
  return Env.dev
})()
