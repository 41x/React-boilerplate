const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`NODE_ENV = ${NODE_ENV}`);

const cleanOptions = {
    root: __dirname,
    exclude: ['index.html'],
    verbose: true,
};

const config = {
    mode: NODE_ENV,
    watch: NODE_ENV === 'development',
    devtool: 'source-map',
};

const browserConfig = {
    ...config,
    context: path.resolve(__dirname, 'src', 'client'),
    entry: './client.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            { test: /\.js$/, include: /src/, loader: 'babel-loader' },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true',
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
        new CleanWebpackPlugin(['public/*.js'], cleanOptions),
    ],

};

const serverConfig = {
    ...config,
    context: path.resolve(__dirname, 'src', 'server'),
    entry: './server.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname),
        filename: 'server.js',
        publicPath: '/',
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'false',
            NODE_ENV: JSON.stringify(NODE_ENV),
        }),
        new CleanWebpackPlugin(['server.js'], cleanOptions),
        new NodemonPlugin(),
    ],
};

module.exports = [browserConfig, serverConfig];
