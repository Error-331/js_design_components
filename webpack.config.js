'use strict';

// external imports
const { resolve } = require('path');

// local imports

// exports
module.exports = {
    target: 'web',

    entry: './index.js',

    output: {
        filename: 'bundle.js',
        path: resolve('./', '.dist')
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: ['node_modules']
    },

    externals: {
        ramda: {
            commonjs: 'ramda',
            commonjs2: 'ramda',
            amd: '_',
            root: '_'
        }
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                use: ['eslint-loader', 'babel-loader'],
                exclude: /(node_modules|bower_components)/,
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'image/svg+xml'}}]
            },

            {
                test: /^((?!\.global).)*\.(png|jpg)$/,
                use: [{loader: 'url-loader', options: {limit: 8192}}]
            },

            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}}]
            },

            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/font-woff'}}]
            },

            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [{loader: 'url-loader', options: {limit: 10000, mimetype: 'application/octet-stream'}}]
            },

            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [{loader: 'file-loader'}]
            }
        ]
    }
};



