const { merge } = require('webpack-merge')
const getBaseConfig = require('./base')

module.exports = merge(getBaseConfig(false), {
  devtool: 'eval',
  mode: 'development',
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    inline: true,
    open: false,
    overlay: true,
  },
})
