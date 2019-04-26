'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.styl','.js', '.vue', '.json', '.ts', '.tsx', '.pug', '.gql'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@core': resolve('src/core'),
      '@applications': resolve('src/applications'),
      '@elements': resolve('src/elements'),
      '@collections': resolve('src/collections'),
      '@components': resolve('src/components'),
      '@layouts': resolve('src/layouts'),
      '@pages': resolve('src/pages'),
      '@store': resolve('src/store'),
      '@directives': resolve('src/directives'),
      '@filters': resolve('src/filters'),
      '@validators': resolve('src/validators'),
      '@assets': resolve('src/assets'),
      '@plugins': resolve('src/plugins'),
    }
  },
  module: {

    rules: [
//      {
//       test: /icons\/(-?\w\/?){0,}\.svg(\?.*)?$/,
//       loader: 'svg-inline-loader'
//  },
      // {
      //   test: /loaders\/(-?\w\/?){0,}\.svg\?sprite$/,
      //   use: [{
      //     loader: 'svg-sprite-loader',
      //     options: {
      //       extract: true,
      //       spriteFilename: 'static/sprite.svg',
      //       name: function(){
      //         console.log(path);
      //         return '[path][name].[ext]';
      //       }
      //     }
      //   },
      // ]

      // },
      // {
      //   test: /loaders\/(-?\w\/?){0,}\.svg(\?.*)?$/,
      //   use: [{
      //       loader: 'svg-sprite-loader',
      //       options: {
      //         extract: true,
      //         spriteFilename: 'static/sprite.svg',
      //         //publicPath: '/',
      //       }
      //     },
      //     //'svgo-loader'
      //   ]
      // },
      {
        test: /icons\/(-?\w\/?){0,}\.svg(\?.*)?$/,
        use: [{
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'static/sprite.svg',
              //publicPath: '/',
            }
          },
          //'svgo-loader'
        ]
      },
//     {
//   test: /\.styl(us)?$/,
//   use: [
//     'vue-style-loader',
//     'css-loader',
//     {loader: 'stylus-loader', options: {use: [],preferPathResolver: 'webpack'}}
//   ]
// },
      // {
      //   test: /\.pug/,
      //   loaders: ['html-loader', 'pug-html-loader'],
      //   options: {
      //     // options to pass to the compiler same as: https://pugjs.org/api/reference.html
      //     appendTsSuffixTo: [/\.pug$/]
      //   }
      // },
      {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
              //configFile: 'tsconfig.json',
              // silent: '',
              // logLevel: ''
              // logInfoToStdOut: ''
              // instance: '',
              // compiler: '',
              //transpileOnly: true,
              // ignoreDiagnostics: '',
              // errorFormatter: '',
              // colors: '',
              // compilerOptions: '',
              // appendTsxSuffixTo: '',
              // entryFileCannotBeJs: '',
              // onlyCompileBundledFiles: '',
              // happyPackMode: '',
              // getCustomTransformer: '',
              appendTsSuffixTo: [/\.vue$/]
          }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /loaders\/(-?\w\/?){0,}\.svg(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /fonts\/(-?\w\/?){0,}\.svg(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.gql$/,
        loader: 'graphql-tag/loader'
      },
    ]
  }
}
