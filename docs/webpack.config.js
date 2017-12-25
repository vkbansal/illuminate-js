let webpack = require('webpack');
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

const config = {
    context: path.resolve(__dirname, '../'),
    entry: ['./docs/index.tsx'],
    output: {
        filename: DEV ? 'bundle.js' : 'bundle.[hash].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: DEV ? '/' : '/illuminate-js/',
        hashDigestLength: 6,
        sourceMapFilename: 'bundle.js.map'
    },
    resolve: {
        modules: [path.resolve(__dirname, '../packages/'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                declaration: false
                            }
                        }
                    }
                ],
                include: [path.resolve(__dirname, '../packages'), path.resolve(__dirname)]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'docs/index.html',
            inject: true,
            filename: 'index.html'
        })
    ]
};

if (PROD) {
    config.plugins.push(new MinifyPlugin());
}

module.exports = config;
