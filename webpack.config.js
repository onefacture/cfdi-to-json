'use strict';

var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts',
    target: 'node', // <-- Important
    externals: [nodeExternals()], // <-- Important
    output: {
        filename: 'index.js', // <-- Important
        libraryTarget: 'commonjs2'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
};
