'use strict'

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
const path = require('path')
const webpackBase = require('./config/webpackBase.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const packagejson = require('./package.json')
const Visualizer = require('webpack-visualizer-plugin')

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
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  module: webpackBase,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].min.css'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
    new HappyPack({
      id: 'jsx',
      threadPool: HappyThreadPool,
      loaders: ['babel-loader']
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
    new CleanWebpackPlugin(resolve('./dev')),
    new Visualizer()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: 'js/[name].bundle.[chunkhash].js',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    modules: ['node_modules', resolve('./node_modules')],
    extensions: ['.web.js', '.js', '.json', '.jsx'],
    alias: {
      '@': './src'
    }
  }
}
