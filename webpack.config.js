/**
 *  xuanshanbo
 *  294662037@qq.com
 */
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const ServerS = require('./config/server.js')
const proxys = require('./config/proxy.js')
const webpackBase = require('./config/webpackBase.js')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: {
    app: [
      'babel-polyfill',
      resolve('./src/index.jsx')
    ]
  },
  output: {
    path: resolve('./dev'), //打包后的文件存放的地方
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: './'
  },
  devServer: {
    contentBase: './dev', //本地服务器所加载的页面所在的目录
    host: ServerS.host,
    port: ServerS.port,
    historyApiFallback: ServerS.historyApiFallback,
    open: ServerS.open,
    proxy: proxys
  },
  module: webpackBase,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].min.css'
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: './index.html', //生成的html存放路径，相对于 path
      template: './public/index.html', //html模板路径
      hash: true, //为静态资源生成hash值
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    })
  ],
  resolve: {
    modules: ['node_modules', resolve('./node_modules')],
    extensions: ['.js', '.jsx', '.json', '.web.js'],
    alias: {
      '@': resolve('src')
    }
  }
}

console.log(`启动服务地址 ${ServerS.host}:${ServerS.port}`)
