const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      "/api": {
        target: 'http://localhost:3030',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
})