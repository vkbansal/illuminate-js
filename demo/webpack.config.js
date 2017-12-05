let webpack = require('webpack');
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

module.exports = {
    context: __dirname,
    entry: ['./index.tsx'],
    output: {
        filename: DEV ? 'bundle.js' : 'bundle.[hash].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: DEV ? '/' : '/illuminate-js/',
        hashDigestLength: 6,
        sourceMapFilename: 'bundle.js.map'
    },
    resolve: {
        modules: [path.resolve(__dirname, '../packages'), 'node_modules']
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
            template: 'index.html',
            inject: true,
            filename: 'index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};
