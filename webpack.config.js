const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevMode = NODE_ENV === 'development';
console.log(`NODE_ENV = ${NODE_ENV}`);

const cleanOptions = {
    root: __dirname,
    verbose: true,
};

const config = {
    mode: NODE_ENV,
    watch: isDevMode,
    devtool: 'source-map',
};

const devModeOnly = (item) => {
    return isDevMode ? [item] : [];
};

const browserConfig = {
    ...config,
    context: path.resolve(__dirname, 'src', 'client'),
    entry: [
        ...devModeOnly('react-hot-loader/patch'),
        ...devModeOnly('webpack-hot-middleware/client'),
        'babel-polyfill',
        './client.js',
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
        publicPath: '/',
    },
    module: {
        rules: [
            { test: /\.js$/, include: /src/, loader: 'babel-loader' },
            {
                test: /^((?!bootstrap\.min).)*\.css$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        sourceMap: true,
                        plugins () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('postcss-cssnext')(),
                                require('postcss-nesting')(),
                                require('postcss-nested')(),

                            ];
                        }
                    }
                }]
            }, {
                test: /bootstrap\.min\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true',
            NODE_ENV: JSON.stringify(NODE_ENV),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new CleanWebpackPlugin(['public'], cleanOptions),
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/index.html`,
            inject: 'body'
        }),
        ...devModeOnly(new webpack.HotModuleReplacementPlugin()),
        // ...devModeOnly(new OpenBrowserPlugin({ url: 'http://localhost:3000' })),

        // uncomment when needed
        // new BundleAnalyzerPlugin(),
    ],
};

const serverConfig = {
    ...config,
    context: path.resolve(__dirname, 'src', 'server'),
    entry: './server.js',
    target: 'node',
    node: {
        // for webpack not to mess up __dirname
        __dirname: false,
        __filename: false,
    },
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
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        new CleanWebpackPlugin(['server.js'], cleanOptions),

        // starts nodemon only in development mode
        new NodemonPlugin({
            nodeArgs: ['--inspect']
        }),
    ],
};

module.exports = [browserConfig, serverConfig];
