const path = require('path')
const autoprefixer = require('autoprefixer')
const htmlWebpackPlugin = require('html-webpack-plugin')
const Uglify = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    list: path.resolve(__dirname, './src/js/list.js')
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader',
        options: {
          variable: 'data'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [autoprefixer('last 5 versions')]
                }
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [autoprefixer('last 5 versions')]
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        loader: [
          'url-loader?limit=1024&name=img/[name]-[hash:16].ext',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|oft|svg)(\?.*)?$/i,
        loader: [
          'url-loader?name=fonts/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new Uglify(),
    new OptimizeCssAssetsPlugin({}),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      title: '腾讯课堂首页',
      chunksSortMode: 'manual',
      chunks: ['index'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new htmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      filename: 'list.html',
      template: path.resolve(__dirname, './src/list.html'),
      title: '腾讯课堂列表页',
      chunksSortMode: 'manual',
      chunks: ['list'],
      excludeChunks: ['node_modules'],
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    open: true,
    host: 'localhost',
    port: 3300
  }
}