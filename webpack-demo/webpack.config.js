const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },
    // 启用 source map sources 中的文件会有所变化
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 生成的 .html 的 title
            title: 'outpub management'
        }),
        new ManifestPlugin()
    ],
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    }

};