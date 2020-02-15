const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devServer: {
    contentBase: './dist'
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader'
              ]
          },
          {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            loader: 'url-loader',
          }
      ]
  },
  devtool: 'inline-source-map',
  plugins: [
      new HtmlWebpackPlugin({
          title: 'writing a loader'
      }),
      new webpack.HotModuleReplacementPlugin({
      })
  ],
//   首先从 loaders 目录查询 loader
  resolveLoader: {
      modules: [
          path.resolve(__dirname, 'loaders'),
          'node_modules',

      ]
  }
};