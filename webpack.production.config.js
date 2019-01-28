'use strict'

let ExtractTextPlugin = require('extract-text-webpack-plugin') //css单独打包
let HtmlWebpackPlugin = require('html-webpack-plugin'), //生成html
  webpack = require('webpack')
const path = require('path')
const webpackBase = require('./config/webpackBase.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const packagejson = require('./package.json')
// var Visualizer = require('webpack-visualizer-plugin');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'babel-polyfill',
      `${__dirname}/src/index.jsx` //唯一入口文件
    ],
    vendor: Object.keys(packagejson.dependencies)
  },
  output: {
    path: path.resolve(__dirname, './dev'), //打包后的文件存放的地方
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  module: webpackBase,
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].main.css',
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
    new HappyPack({
      id: 'jsx',
      cache: true,
      threadPool: HappyThreadPool,
      loaders: ['babel-loader']
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [
            // require('postcss-pxtorem')({
            //     rootValue: 10,
            //     propWhiteList: []
            // }),
            // require('autoprefixer')({
            //     browsers: ['not ie <= 8', 'last 2 versions'],
            //     remove: true // 是否去掉不必要的前缀 默认：true
            // })
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
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        // 去掉debugger和console
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: 'children-async'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'],
      filename: '[name].js',
      minChunks: Infinity
    }),
    new CleanWebpackPlugin('dev')
  ],
  resolve: {
    modules: ['node_modules', path.join(__dirname, './node_modules')],
    extensions: ['.web.js', '.js', '.json', '.jsx'],
    alias: {
      '@': resolve('src')
    }
  }
}
