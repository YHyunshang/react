/**
 * xuanshanbo
 */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const os = require('os')
let cpuLength = os.cpus().length
const CssExtractLoader = MiniCssExtractPlugin.loader
const CssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]_[local]--[hash:base64:5]'
  }
}
const PostcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [
      require('autoprefixer')
    ]
  }
}

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/images') // 2. 自己私人的 svg 存放目录
]

module.exports = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      include: path.resolve('src'),
      use: [
        {
          loader: 'thread-loader',
          options: {
            // 开销大的时候开启多线程，用node获取cpu数启动
            workers: cpuLength
          }
        },
        'babel-loader'
        // 你的高开销的loader放置在此 (e.g babel-loader)
      ],
      exclude: /node_modules/
    },
    {
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      use: 'url-loader?limit=15000&name=src/images/[name].[ext]'
    },
    {
      test: /\.css$/,
      use: [
        CssExtractLoader,
        CssLoader,
        PostcssLoader
      ]
    },
    {
      test: /\.scss$/,
      use: [
        CssExtractLoader,
        CssLoader,
        PostcssLoader,
        'sass-loader'
      ]
    },
    {
      test: /\.less$/,
      use: [
        CssExtractLoader,
        CssLoader,
        PostcssLoader,
        'less-loader'
      ]
    },
    {
      test: /\.(svg)$/i,
      use: 'svg-sprite-loader',
      include: svgDirs // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
    }
  ]
}
