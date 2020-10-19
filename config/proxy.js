/*
 * @Author: your name
 * @Date: 2020-07-17 10:28:41
 * @LastEditTime: 2020-08-12 09:58:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react/YH-react/config/proxy.js
 */
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
