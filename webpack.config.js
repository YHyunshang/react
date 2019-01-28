/**
 *  xuanshanbo
 *  294662037@qq.com
 */
let ExtractTextPlugin = require('extract-text-webpack-plugin') //css单独打包
let HtmlWebpackPlugin = require('html-webpack-plugin'), //生成html
  // var pxtorem = require('postcss-pxtorem');
  webpack = require('webpack')
let ReactJsx = require('eslint-plugin-react')
const path = require('path')
const ServerS = require('./config/server.js')
const proxys = require('./config/proxy.js')
const webpackBase = require('./config/webpackBase.js')
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'babel-polyfill',
      `${__dirname}/src/index.jsx` //唯一入口文件
    ]
  },
  output: {
    path: path.resolve(__dirname, './dev'), //打包后的文件存放的地方
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  devServer: {
    contentBase: './dev', //本地服务器所加载的页面所在的目录
    host: ServerS.host,
    port: ServerS.port,
    historyApiFallback: ServerS.historyApiFallback,
    inline: ServerS.inline,
    open: ServerS.open,
    proxy: proxys
  },
  module: webpackBase,
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].main.css',
      allChunks: true
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [
            // require('postcss-pxtorem')({
            // rootValue: 16,
            // propWhiteList: ['*']
            // }),
            require('autoprefixer')
          ]
        }
      }
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: './index.html', //生成的html存放路径，相对于 path
      template: './public/index.html', //html模板路径
      hash: true, //为静态资源生成hash值
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HappyPack({
      id: 'jsx',
      cache: true,
      threadPool: HappyThreadPool,
      loaders: ['babel-loader']
    })
  ],
  resolve: {
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    extensions: ['.web.js', '.js', '.json', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  }
}
console.log(`启动服务地址localhost:${ServerS.port}`)
