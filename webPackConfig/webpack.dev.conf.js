const path = require('path');
const webpack = require('webpack')

const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  output: {
    filename: `${baseWebpackConfig.externals.paths.assets}js/[name].js`,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new MiniCssExtractPlugin({
      filename: `${baseWebpackConfig.externals.paths.assets}css/[name].css`,
      chunkFilename: '[id].css',
      ignoreOrder: false, 
    }),
  ],
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    compress: true,
    port: 8084,
    overlay: true,

  },
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})