/**
 *  xuanshanbo
 *  294662037@qq.com
 */

'use strict'

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
const path = require('path')
const webpackBase = require('./config/webpackBase.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
let CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const TerserPlugin = require('terser-webpack-pclugin')
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  mode: 'production',
  devtool: 'cheap-source-map',
  entry: {
    // app: [
    //   'babel-polyfill',
    //   resolve('./src/index.jsx')
    // ],
    // vendor: Object.keys(packagejson.dependencies)
    app: './src/index.jsx'
  },
  output: {
    path: resolve('./dev'), //打包后的文件存放的地方
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: './'
  },
  module: webpackBase,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].min.css'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: './index.html', //生成的html存放路径，相对于 path
      template: './public/index.html', //html模板路径
      hash: true, //为静态资源生成hash值
      minify: { //压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin(resolve('./dev')),
    new ProgressBarPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
      cacheGroups: {
        reactMin: {
          test: /react-redux|react-router|react-router-dom|react-dom|react-flip-move/,
          name: 'reactMin',
          enforce: true,
          minChunks: 1,
          filename: 'js/reactMin/[name].bundle.[chunkhash].js'
        },
        vendor: {
          test: /material-ui/,
          name: 'vendor',
          enforce: true,
          minChunks: 1,
          filename: 'js/vendor/[name].bundle.[chunkhash].js'
        }
      }
    }
    // minimizer: [
    //   new TerserPlugin({
    //     cache: true,
    //   }),
    // ]
  },
  resolve: {
    modules: ['node_modules', resolve('./node_modules')],
    extensions: ['.js', '.jsx', '.json', '.web.js'],
    alias: {
      '@': './src'
    }
  }
}
