const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
  pages_pug: path.join(__dirname, '../src/pug/pages'),
}
const PAGES = fs.readdirSync(PATHS.pages_pug).filter( fileName => fileName.endsWith('.pug'))

module.exports = {
  // BASE config

    externals:{
        paths:PATHS
    },
    entry:{
      main: PATHS.src,
    }, 
    output: {
      path: PATHS.dist,
      publicPath: '/'
    },
    plugins: [
      ...PAGES.map(page => new HtmlWebpackPlugin({
        template: `${PATHS.pages_pug}/${page}`,
        filename: `./${page.replace(/\.pug/,'.html')}`,
        minify: {
          collapseWhitespace: false,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
      })),
      new CopyWebpackPlugin({
        patterns:[
          { from: `${PATHS.src}/${PATHS.assets}img`, to: `img` },
          { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `assets/fonts` },
          { from: PATHS.src + '/static' }
        ]
      }),
      new VueLoaderPlugin(),

    ],
    resolve: {
      extensions: ['.js', '.ts'],
      alias:{
        'vue$': 'vue/dist/vue.js',
        '~': 'src'
      }
    },
    optimization:{
      splitChunks:{
        cacheGroups:{
          vendor:{
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    module:{
      rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { 
            sourceMap: true, 
          },
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }],
      },{
        test: /\.m?(js|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },{
        test: /\.(img|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/img/',
        }
      },{
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },{
        test: /\.pug$/,
        oneOf: [
          // это применяется к `<template lang="pug">` в компонентах Vue
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'] //pug-loader не поддерживается Vue
          },
          // это применяется к импортам pug внутри JavaScript
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ],
      },
      ]
    }
  };
  