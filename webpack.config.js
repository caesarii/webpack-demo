var path = require('path');

module.exports = (env) => {
    console.log('env', env)
    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'webpack-numbers.js',
          library: 'webpackNumbers',
          libraryTarget: 'umd',
        },
        devtool: 'source-map',
        optimization: {
            runtimeChunk: true,
        },
        externals: {
            lodash: {
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash',
                root: '_',
            }
        }
    }
};