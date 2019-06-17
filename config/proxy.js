/**
 * xuanshanbo
 * 环境配置
 */
module.exports = {
  development: {
    '/api': {
      target: 'http://localhost:3000',
      secure: false,
      changeOrigin: true
    }
  },
  production: {
    '/api': {
      target: 'http://localhost:3100',
      secure: false,
      changeOrigin: true
    }
  }
}[process.env.NODE_ENV]
