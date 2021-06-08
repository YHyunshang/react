const path = require('path')
const os = require('os')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const AutoPrefixer = require('autoprefixer')
const svgToMiniDataURI = require('mini-svg-data-uri')

const env = (process.env.ENV || 'dev').toLowerCase()

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const PostcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      plugins: [AutoPrefixer],
    },
  },
}

module.exports = (isProductionMode) => ({
  entry: './src/index.jsx',
  output: {
    path: resolve('./dist'), // 打包后的文件存放的地方
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/i,
        include: path.resolve('src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              // 开销大的时候开启多线程，用node获取cpu数启动
              workers: os.cpus().length,
            },
          },
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/i,
        use: 'url-loader?limit=15000&name=./images/[name].[ext]',
      },
      {
        test: /\.css$/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          PostcssLoader,
        ],
      },
      {
        test: /\.less$/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          PostcssLoader,
          'less-loader',
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content) => svgToMiniDataURI(content.toString()),
            },
          },
        ],
        include: [resolve('src/images')],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', resolve('./node_modules'), resolve('./src')],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      '@ui-comps': resolve('src/components/ui'),
      '@biz-comps': resolve('src/components/business'),
      '@hoc': resolve('src/components/HOC'),
      '@images': resolve('src/images'),
      '@conf': resolve(`env-config/${env}`),
      '@utils': resolve('src/utils'),
      '@http': resolve('src/http'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].min.css',
      chunkFilename: 'css/[name].[contenthash:8].min.css',
    }),
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      filename: './index.html', // 生成的html存放路径，相对于 path
      template: './public/index.html', // html模板路径
      hash: true, // 为静态资源生成hash值
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
      },
      favicon: './public/favicon.ico',
    }),
    new CaseSensitivePathsPlugin(),
  ],
})
