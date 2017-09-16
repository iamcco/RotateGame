'use strict';

let path = require('path');
let webpack = require('webpack');
let CleanPlugin = require('clean-webpack-plugin');
let CopyPlugin = require('copy-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV;
let plugins = [
    new CleanPlugin(['dist'], {             // 删除 dist 文件夹
        root: path.join(__dirname, './'),
        verbose: true,
        dry: false
    }),
    new CopyPlugin([{
        from: './src/html/index.html',
        to: './'
    }], {
        copyUnmodified: false
    })
];

if (IS_PRODUCTION === 'production') {
    plugins = plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            test: /\.js?$/,
            output: {
                comments: false  // remove all comments
            },
            compress: {
                warnings: false  // remove all warnings
            }
        })
    ]);
}

module.exports = {
    entry: {
        'index': './src/script/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            },
            include: path.join(__dirname, 'src', 'script')
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            include: path.join(__dirname, 'src', 'css')
        }]
    },
    plugins: plugins
};
