const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemovePlugin = require('remove-files-webpack-plugin');

const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // Build config
  mode: 'production',
  output: {
    filename: `${baseWebpackConfig.externals.paths.assets}js/[name].[hash].js`,
  },
  plugins: [
    new RemovePlugin({
      before:{
        root: baseWebpackConfig.externals.paths.dist,
        include: [
          './assets',
          './img'
        ],
      },

    }),
    require('cssnano')
    ({
      preset:[
        'default', {
          discardComments:{
            removeAll: true,
          }
        }
      ]
    }), 
    new MiniCssExtractPlugin({
      filename: `${baseWebpackConfig.externals.paths.assets}css/[name].[hash].css`,
      chunkFilename: '[id].css',
      ignoreOrder: false, 
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
      }),
      new TerserPlugin({
        cache: true
      }),
    ]
  },
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})