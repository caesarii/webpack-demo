const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                  {
                      loader: path.resolve('./loaders/style-loader')
                  },
                  {
                      loader: path.resolve('./loaders/css-loader')
                  }
              ]
          },
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'writing a loader'
      })
  ],
  // 首先从 loaders 目录查询 loader
//   resolveLoader: {
//       modules: [
//           'node_modules',
//           path.resolve(__dirname, 'loaders'),
//       ]
//   }
};